const db = require('./db'); //Database

/**
 * Validate the address of the order and all the items in it
 * @param {object[]} order First element should be the address, second should be a list of dishes 
 */
exports.validateOrder = (order) =>
{
    return  validateAddress(order[0])&&
            validateItems(  order[1]);
}


/**
 * Look in the database if a specific order exists based on its ID
 * @param {int} order_id ID of the order to look for
 */
exports.orderExists = async (order_id) =>
{
    try
    {   //If it worked, it will return the order
        return await db.findOrder(order_id);
    }
    catch(err){
        //If there is an error, it means the order doesn't exists or that the ID is invalid
        console.log(err);
    }
}

/**
 * Look if the id send is a number and not empty
 * @param {int} id ID to validate
 */
exports.validateId = (id) =>
{
    return typeof id === 'number' && !!id;
}

/**
 * Valdiate if the account has valid informations
 * @param {object} account Object of an account requiring : ID, Password, first name and last name 
 */
exports.validateAccount = (account) =>{
    return  validateUser(    account.id)&&
            validatePassword(account.password)&&
            validateName(    account.firstName)&&
            validateName(    account.lastName);//Same function for the first and last name
            
}

/**
 * Look if the account exists
 * @param {string} username ID of the account
 * @param {string} password Password of the account
 */
exports.validateLogin = async (username, password) =>{

    /** 
     * Get every accounts on the db in case new ones have been created before the login
     * Also prevents the injection of code
     *  */
    let accounts = await db.getAllAccounts();

    //Look in the list of accounts
    for(let i = 0; i < accounts.length; i++)
    {
        //if the information sent exists in the list of accounts
        if(accounts[i].id_compte === username && accounts[i].mot_de_passe === password)
        {
            //Will return that it is true that it exists
            return true;
        }
    }
    /** If it went through the list without finding the account, it doesn't exists */
    return false;
}

/**
 * Validate if a state exists
 * @param {int} state_id id of the state to be validated 
 */
exports.validateState = async (state_id) => 
{
    //Will save if the state exists
    let stateExist = false;

    //Get all the states possible
    let states = await db.getAllOrderStates(state_id);

    //Look through every states
    for(let i = 0 ; i < states.length; i++){
        //If that state exists 
        if(states[i].id_etat_commande === state_id){

            //Modify the variable to say it exists
            stateExist = true;

            //Prevent from looping further
            break;
        }
    }
    //Return the validation
    return typeof state_id === 'number' && !!state_id && stateExist;
}


/**
 * Validate if the id of the user is valid
 * @param {string} user id is a string for the account 
 */
const validateUser = (user) =>
{
    //return validation
    return typeof user === 'string' && !!user;
}

/**
 * Validate if the password of the user is valid
 * @param {string} password string of the password
 */
const validatePassword = (password) =>{

    //return validation
    return typeof password === 'string' && !!password;
}

/**
 * Validate the first or the last name of the user (can't do both at the same time)
 * @param {string} name  Can first or last name of the user 
 */
const validateName = (name) => {

    //return validation
    return typeof name === 'string' && !!name ;
}

/**
 * Validate the address of the user 
 * @param {string} address String of the address of the user
 */
const validateAddress = (address) => 
{
    //return validation
    return typeof address === 'string' && !!address;
}

/**
 * Validate if the price.
 * @param {float} price Float of the price. Should be a number 
 */
const validatePrice = (price) => 
{
    //Return validation
    return typeof price === 'number' && !!price;
}

/**
 * Return if the order's dishes are valid or not
 * @param {number[][]} items List of the dishes ordered with their amount
 */
const validateItems = (items) => 
{
    //If it can go through the conditions, it should stay true
    let valid = true;

    //All the items in the order
    for(let item in items){

        //Get the evaluated dish
        let dish = items[item[0]];

        //Validate if the dish's ID is a number or if there is nothing in it
        if(typeof dish[0].id_nourriture !== 'number' || !dish[0].id_nourriture)
        {
            //It will be invalid
            valid = false;

            //If its not valid, the whole order is invalid
            //There is no need to go further
            break;
        }

        //If the quantity is not a number or it is empty
        if(typeof dish[1] !== 'number' || !dish[1])
        {
            //It will be invalid
            valid = false;

            //There is no need to go further
            break;
        }
    }

    //Return Validity
    return valid;
}

/**************************************************************************** */