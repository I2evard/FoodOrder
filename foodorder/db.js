//Go get the connetion promise
let connectionPromise = require('./connection');
const mysql = require('mysql');
/*************************************************************************************************************************/
//-------------------------GET-------------------------//

/**
 * Return all the accounts and all infos
 */
exports.getAllAccounts = async () => {

        //Wait for the connection to be established and then save it
        let connection = await connectionPromise;
    
        //Used to send an SQL request
        let accounts = await connection.query(
            'SELECT * FROM compte;'
        );

        return accounts;
};

/**
 * Get the informations of an account based on its ID
 * @param {string} body id  of the account  
 */
exports.getAccount = async (body) =>{
    //Establish a connection
    let connection = await connectionPromise;

    //Make a query to the DB
    return await connection.query(
        ' Select * FROM compte WHERE id_compte = ' + mysql.escape(body.id)
    );
}

/**
 * Return all the orders and their informations (order, account, the amount of dishes)
 */
exports.getAllOrders = async () => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    return await connection.query(
        `SELECT * , nourriture.nom As food_name
        FROM commande
        INNER JOIN nourriture_commande ON nourriture_commande.id_commande = commande.id_commande
        INNER JOIN nourriture ON nourriture.id_nourriture = nourriture_commande.id_nourriture
        INNER JOIN compte ON compte.id_compte = commande.id_compte
        ORDER BY commande.date_livraison ASC;
        `
    );
};

/**
 * Returns all the informations of an order based on the ID given
 * @param {int} order_id id of the order to find in the DB 
 */
exports.findOrder = async (order_id) =>{
    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    return await connection.query(
        `SELECT * 
        FROM commande
        WHERE id_commande = ?;
        `,
        [order_id]
    );
}

/**
 * Return all the orders and their informations from a specific account
 * @param {string} id_compte string of the account's id 
 */
exports.getAccountOrders = async (id_compte) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    return await connection.query(
        `SELECT * , nourriture.nom As food_name
        FROM commande
        INNER JOIN nourriture_commande ON nourriture_commande.id_commande = commande.id_commande
        INNER JOIN nourriture ON nourriture.id_nourriture = nourriture_commande.id_nourriture
        INNER JOIN compte ON compte.id_compte = commande.id_compte
        WHERE commande.id_compte = ?
        ORDER BY commande.date_livraison ASC;
        `,
        [id_compte]
    );
};

/**
 * Return all the informations from the order's id given in parameter
 * @param {int} id_commande id form the order to look for its informations 
 */
exports.getSpecificOrder = async (id_commande) => {
        //Wait for the connection to be established and then save it
        let connection = await connectionPromise;

        //Used to send an SQL request
        return await connection.query(
            `SELECT * , nourriture.nom As food_name
            FROM commande
            INNER JOIN nourriture_commande ON nourriture_commande.id_commande = commande.id_commande
            INNER JOIN nourriture ON nourriture.id_nourriture = nourriture_commande.id_nourriture
            INNER JOIN compte ON compte.id_compte = commande.id_compte
            WHERE commande.id_commande = ?;
            `,
            [id_commande]
        );
}

/**
 * Return all the possibles accounts' types 
 */
exports.getAllAccountTypes = async () => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    return await connection.query(
        'SELECT * FROM type_compte;'
    );
};

/**
 * Return all the orders' states possibles
 */
exports.getAllOrderStates = async () => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    return await connection.query(
        'SELECT * FROM etat_commande;'
    );
};

/**
 * Return all the dishes available from the DB
 */
exports.getAllFoods = async () => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    let dishes =  connection.query(
        'SELECT * FROM nourriture;'
    );

    return dishes;
};

/**
 * Return all the categories availables in the DB
 */
exports.getAllCategories = async () => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    let categories =  connection.query(
        'SELECT * FROM categorie;'
    );

    return categories;
};

//---------------------FIN GET-------------------------//
/*************************************************************************************************************************/

/*************************************************************************************************************************/
//-----------------------ADD---------------------------//

/**
 * Add a new account to the database
 * @param {object} body object containing all the informations to create a new account (id_compte, mot_de_passe, nom, prenom, id_type_compte)
 */
exports.addAccount = async (body) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    //New accounts will be assigned the client type by default
    connection.query(
        `INSERT INTO compte(id_compte, mot_de_passe, nom, prenom, id_type_compte)
        VALUES(?,?,?,?,?)`,
        [body.id, body.password, body.lastName, body.firstName, 1] // An account created on this road is by default a client account
    );
};

/**
 * Add an order to the database
 * @param {string} user         The user's ID
 * @param {object[][]}items     Array with the list of items to add with their amount
 */
exports.addOrder = async (user, order) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request, return the id of that order made
    let query = await connection.query(
        `
        INSERT INTO commande(id_compte, id_etat_commande, adresse, prix_total, date_livraison)
        VALUES(?,?,?,?,UTC_TIMESTAMP()); 
        `,
        [user.id_compte, 1, order[0], order[2]]
        );

    //Get the last inserted ID
    let order_id = query.insertId;

    //Get the items linked to the order
    let items = order[1];

    /**For every items in the list */
    for(let item of items){

        //Focus on that item
        let dish = item[0];

        //Get the amount of dishes that has been ordered
        let quantity = item[1];

        //Add them in the DB 
        connection.query(
            `
            INSERT INTO nourriture_commande (id_commande, id_nourriture, quantite)
            VALUES(?,?,?); 
            `,
            [order_id, dish.id_nourriture, quantity ]
        );
    }

    //Return the id of the order added
    return order_id;
};

/**
 * Add a new type of account in the database
 * @param {String} name Name of the new type of account
 */
exports.addTypeAccount = async (name) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    connection.query(
        `INSERT INTO type_compte(nom)
        VALUES(?)`,
        [name]
    );
};

/**
 * Add a new possible state an order could be
 * @param {String} name The state's name
 */
exports.addStateOrder = async (name) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    connection.query(
        `INSERT INTO etat_commande(nom)
        VALUES(?)`,
        [name]
    );
};

/**
 * Add a new food/dish in the database (Needs to add more parameters for the DB SO IT IS NOT FUNCTIONNAL FOR NOW)
 * @param {String} name     Name of the new food/Dish
 * @param {Int} price       Price of the food
 */
exports.addFood = async (name, price) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    connection.query(
        `INSERT INTO nourriture(nom, prix)
        VALUES(?,?)`,
        [name, price]
    );
};


//---------------------FIN ADD-------------------------//
/*************************************************************************************************************************/

/*************************************************************************************************************************/
//-----------------------UPDATE---------------------------//

/**
 * Update an order's state in the database
 * @param {int} state_id id of the state to assign to the order
 * @param {int} order_id id of the order to update 
 */
exports.updateStateOrder = async (state_id, order_id) => {

    //Wait for the connection to be established and then save it
    let connection = await connectionPromise;

    //Used to send an SQL request
    connection.query(
        `
        UPDATE commande
        SET id_etat_commande = ? 
        WHERE id_commande = ?;
        `,
        [state_id, order_id]
    );
};

