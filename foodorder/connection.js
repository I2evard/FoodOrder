//Require the install of : npm install promise-mysql
let mysql = require('promise-mysql');

//Crée un bassin de connection
//Create a pool of connections
let connectionPromise = mysql.createPool({

        //Quantitée de connections voulu dans le pool (Dépend de la puissance du serveur)
        //Amount of connections available in the pool (Relative to the server's bandwidth)
        connectionLimit: 10,
    
        //Adresse de notre serveur
        //Server address
        host: 'localhost',
    
        //Nom d'user pour ce connecter a la base de donnée
        //Usernam to connect at the database
        user: 'root',

        //Pas de mdp par défaut
        //Default password
        password: '',
    
        //Spécifie la database a la quelle on ce connecte
        //Specifies the database's name that will be used 
        database: 'commande_nourriture_kt_jlt'
});

//Exporte la promesse
//Export the promess
module.exports = connectionPromise;