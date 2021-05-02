const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');

const db = require('./db'); //Database
const validation = require('./validation');
const sse = require('./middleware-sse');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

/** Port to access the server */
const PORT = process.env.PORT;

/** Creation of the server */
let app = express();

/** List all the new orders submited by the users.
 *  an employe or admin is looking at the page of orders
*/
let newOrdersID = [];

// Add more options to Helmet 
let helmetOptions = null;
if(app.settings.env === 'development'){
    helmetOptions = require('./developement-csp');
}

// Ajout de middlewares
app.use(helmet(helmetOptions));
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ strict: false }));
app.use(serveStatic('./public'));
app.use(sse());

app.use(session({
    cookie: {maxAge:3600000},
    saveUninitialized: false,
    name: process.npm_package_name,
    store: new MemoryStore({ checkPeriod:3600000}),
    resave: false,
    secret: "IncredibleSecret"
}));

//Road related to the dishes availables on the DB
app.get('/dishes', async (request,response) =>{

    //Object containing an array of all the dishes available
    let data = await db.getAllFoods();

    //Send the array to the caller
    response.status(200).json(data);
});

//Get from the DB all the states an order can have  
app.get('/states', async(request,response) =>{

    //Object containing an array of all the states possibles
    let data = await db.getAllOrderStates();

     //Answer the caller with the array 
    response.status(200).json(data);
});

//Road related to the orders
app.route('/orders')
    .get( async (request,response) =>{

        //If it is not connected it shouldn't be possible to see any order
        if(!request.session.account){

            //Teapot cuz life needs more positivity
            return response.sendStatus(418);
        }

        //Will contain all the orders to be sent
        let data = [];

        //If the user's account is a client
        if(request.session.account.id_type_compte === 1)
        {
            //Get all the orders associated to this account
            data = await db.getAccountOrders(request.session.account.id_compte);
        }
        else
        {
            //Get all the orders in the database
            data = await db.getAllOrders();
        }

        //Send those orders at the user
        response.status(200).json(data);
    })
    .post(async (request, response) => {

        //Validate the form AND look if there is a session open
        //Prevent from receiving orders from someone that isn't connected
        if(!validation.validateOrder(request.body) && !request.session.account)
        {
            //Must be an hacker at his point
            response.sendStatus(400);

            //Prevents from groing further
            return;
        }
        
        //Add the new order to the database
        let last_id = await db.addOrder(request.session.account,request.body);

        //Add the id of that order to the list of the new orders
        newOrdersID.push(last_id);

        //Send some OK
        response.sendStatus(200);

        //Send the event to trigger the listeners
        response.pushJson(last_id, 'add');
    })
    .patch((request, response) => {

        //Validate if the order, state exists and if the account's type.
        //Regular users shouldn't have acces to a feature affecting this methode
        if(!validation.orderExists(request.body[1].id_commande) && !validation.validateState(request.body[0]) || request.session.account.id_type_compte === 1)
        {
            //Teapot :)
            response.sendStatus(418);

            //Prevent from going further
            return;
        }

        //Tell the database to update the order. (state_id, order_id)
        db.updateStateOrder(request.body[0], request.body[1].id_commande);

        //Answers OK to the sender
        response.sendStatus(200);

        //Broadcast that an update has been made
        response.pushJson( request.body, 'updateState');
    });

//Send all the new orders with their associated informations (prevent from loading all the orders from the database)
app.get('/New-Orders', async(request, response)=>{

    //Array that will save the orders' objects
    let data = [];

    //For every new orders' ID
    for(let i = 0 ; i< newOrdersID.length; i++)
    {
        //Get that order from the database and save it in the array
        data.push(await db.getSpecificOrder(newOrdersID[i]));
    }

    //Look if the user asking this information isn't a regular user
    if(request.session.account.id_type_compte !== 1)
    {

        //Send the list of new orders
        response.status(200).json(data);

        //Empty the list
        newOrdersID = [];
    }
});

//Return all the categories available in the database
app.get('/categories', async (request,response) =>{

    //Go get all the categories from the DB
    let data = await db.getAllCategories();

    //Send those categories has JSON
    response.status(200).json(data);
});

//Incharge of doing the live exchanges with the users and server
app.get('/notification', (request, response) =>{
    response.initStream();
});

//Road related to the accounts
app.route('/accounts')
    //Return 200 (OK) if it can get all the dishes
    .get( async (request,response) =>{

        //Look if the user's account has the level to see this information
        if(request.session.accunt.id_type_compte === 3){
            //Get all the accounts information on the database
            let data = await db.getAllAccounts();

            //Return the information
            response.status(200).json(data);
        }

    })
    .post((request, response) => {

        //Validate if the account created has valid informations
        if(!validation.validateAccount(request.body)){

            //Error
            response.sendStatus(400);

            //Prevents from going further
            return;
        }
        
        //Add the new account to the DB
        db.addAccount(request.body);

        //Send OK 
        response.sendStatus(200);
    });

//Used to return the type of account of the user that is asking
app.get('/accType', (request,response) =>{

    //Look if there is an account
    if(!!request.session.account){

        //Save the ID from the type of account the user has
        let data = request.session.account.id_type_compte;

        //Send the id
        response.status(200).json(data);
    }
});

//Used to login 
app.route('/login')
    .get((request,response) =>{

        //If there isn't a session
        if(!request.session.account){
            //Send a teapot :) 
            response.sendStatus(418);
        }
        else
        {
            //Else, OK 
            response.sendStatus(200);
        }
    })
    .post( async (request, response) => {

        //Wait for the server to look in the db if the account exists
        let isValid = await validation.validateLogin(request.body.id, request.body.password);

        //If it is not valid, will send an error 
        if(!isValid){
            response.sendStatus(401);
        }
        else
        {
            //Retrieve the account's informations
            let account = await db.getAccount(request.body);

            //Assign the informations to the session
            request.session.account = account[0];

            //Send OK 
            response.sendStatus(200);
        }
    });

    //Used to log out from the session
app.get('/logout', async (request,response) => {

    //Set the requester's session to undefined 
    request.session.account = undefined;

    //Send OK 
    response.sendStatus(200);

    // Then send the event logout for the listeners
    response.pushJson({},'logout');
});


// Renvoyer une erreur 404 pour les routes non définies
// Return an error 404 for all the undefined roads
app.use(function (request, response) {

    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    // Return string saying that the link doesn't exists
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(PORT);
