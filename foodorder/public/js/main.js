(() => {
    
    //All the categories available
    let html_categories = document.getElementsByClassName("Categorie");

    //Contains the template that will be used to display dishes
    let dishTemplate = document.getElementById('Container-Dish');

    //The HTML element containing the template of for the quick view of the order
    let quickOrderTemplate = document.getElementById('Container-Quickview');

    //The HTML element containing the orders' visuals, total and confirm button
    let quickView = document.getElementById("Order-Quickview");

    //List of every HTML elements in the quick view
    let listOrderViews = [];

    // Button submitting the form
    let btnConfirm = document.getElementById('btn-submit');

    //Will contain every dishes returned by the server
    let listDishes = [];

    //Will contain every categories available on the server
    let listCategories = [];

    // Will contain the list of every dishes ordered by the user
    let dishOrdered = [];

    //Contain the price of the futur order made
    let totalPrice = 0;

    /**
     * Create a template for the dish sent and associates it to its category
     * @param {object} dish dish associated with the template
     * @param {int} index index to associate with the template
     */
    const addDish = (dish, index) => {

        //Clone un nouvel élément du template "Dish-Template"
        //Clone a new element from the template "Dish-Template"
        let newTemplate = dishTemplate.cloneNode(true);

        //Remove if from the hidden class since this one needs to be visible
        newTemplate.classList.remove("hidden");

        //Associate the dish to the template's value (easier to find afterwards)
        newTemplate.value = dish;

        //Assign the image's road to the image node's src
        newTemplate.querySelector("#image").src = dish.image_url;

        //Assign the dish's name
        newTemplate.querySelector("#Name").innerText = dish.nom;

        //Assign the dish's description
        newTemplate.querySelector("#Description-Text").innerText = dish.description;

        //Assign the price with its 2 decimals
        newTemplate.querySelector("#Price").innerText = dish.prix.toFixed(2);

        //Add a listener for the "Add to Order" button so it could create a quickview template
        newTemplate.querySelector("#btn-addToOrder").addEventListener('click', addToOrder);

        //Index associated to the dish, will be easier to find in the list of dishes afterwards
        newTemplate.querySelector("#btn-addToOrder").index = index;

        //Once the templace is created, assign it to the right category
        assignCategorie(dish, newTemplate);
    }

    /**
     * Add itself to the list of orders when the button is pressed. 
     * It will get the quantity of items entered by the user in the input field 
     * @param {*} event Event of a button pressed to add a dish to the quick view
     */
    const addToOrder = async (event) =>{

        //Look if the user is connected
        let response = await isConnected();

        //If the user isn't connected
        if(!response.ok){
            //Alert the user to connect itself
            alert("You must be connected to place an order");

            //No need to continue further
            return;
        }

        //Gets the dish relative to the index of the event (button)
        let dish = listDishes[event.target.index];

        //Get the quantity entered by the user in the input field associated with the parent of the button
        let quantity = event.target.parentNode.querySelector("#quantity").value;

        //Will check if a similar order has already been made
        let dishFound = false;

        //If the user didn't add any amount, it will be assigned a default of 1 
        if(quantity <= 0 || !quantity){
            quantity = 1;
        }

        //Create a new object based on the current order made
        let order = [dish, parseInt(quantity)];

        //Look in the list of orders if the dish has already been added
        for(let i = 0; i < dishOrdered.length; i++)
        {
            //Get the current dish 
            let existingOrderDish = dishOrdered[i];
            
            //Look at the first elements of both arrays {Dish, quantity}
            //Look if it already exists
            if(existingOrderDish[0] === order[0])
            {
                //It has been found
                dishFound = true;
                
                //Add the quantity added for that dish to the quantity already set
                existingOrderDish[1] += order[1];

                //No need to loop further
                break;
            }
        }

        //If the dish hasn't been found, it can be added 
        if(!dishFound){

            //Add that dish to the current order and get its index
            let dishOrderIndex = dishOrdered.push(order) -1;

            //Add to quickview the new order
            addQuickview(dishOrderIndex);
        }
        else
        {
            //Simply update the prices and quantity
            updateQuickView();
        }

    }

    /**
     * Create a new container in the quickview for the new dish
     * @param {int} dishOrderIndex int of the last dish added to the order
     */
    const addQuickview = (dishOrderIndex) =>
    {
        
        //Get the list of dishes with its quantity
        let listDishes = dishOrdered[dishOrderIndex];

        //The dish itself
        let dish = listDishes[0];

        //Clone a new template for the dish to be displayed
        let newTemplate = quickOrderTemplate.cloneNode(true);

        //Assign the dish to the view's value so it can be easily accessible later
        newTemplate.value = dish;

        //Assign the index of its position in the list
        newTemplate.index = listOrderViews.push(newTemplate) -1;

        //Assign the image URL
        newTemplate.querySelector("#image").src = dish.image_url;

        //Assign the name
        newTemplate.querySelector("#Name").innerText = dish.nom;

        //Add a listener for the button "X", allowing it to be removed
        newTemplate.querySelector("#btn-remove-item").addEventListener('click', removeFromOrder);
        
        //Make it visible
        newTemplate.classList.remove("hidden");

        //Add it to the body (its container)
        quickView.querySelector("#Body").append(newTemplate);

        //Update the quickview to see the changes
        updateQuickView();
    }

    /**
     * Updates the total price, dishes's prices and quantity ordered in the order's quickview 
     */
    const updateQuickView = () =>{

        //If there is at least 1 element in the order
        if(dishOrdered.length >= 1){

            //The body can now be displayed
            quickView.classList.remove("hidden");

            //Reset the total price
            totalPrice = 0;

            //Update the prices of every items in the quickview
            for(let i = 0; i < dishOrdered.length; i++)
            {

                //Get the dish that will be updated
                let dish = dishOrdered[i];

                //price * amount = total price for that dish
                let totalPriceDish = dish[0].prix * dish[1];

                //Add that price to the total price for the order
                totalPrice += totalPriceDish;

                //Assign the quantity to the view
                listOrderViews[i].querySelector("#Quantity").innerText = dish[1] + " units";

                //Assign the total price for that item to its view
                listOrderViews[i].querySelector("#Total-Price").innerText =  totalPriceDish.toFixed(2) + "$"; 

            }

            //Assign the total price for that order
            quickView.querySelector("#Total").innerText = totalPrice.toFixed(2)+"$";
        }
        else
        {
            //There is no item ordred, hide the quickview
            quickView.classList.add("hidden");
        }
    }

    /**
     * Remove a dish form the order
     * @param {event} event button pressed to remove the order 
     */
    const removeFromOrder = (event) =>{

        //Get the HTML element to remove
        let element = event.currentTarget.parentNode.closest("#Container-Quickview");

        //Get the dish
        let dish = element.value;

        //Remove from the list of HTML elements 
        listOrderViews.splice(listOrderViews.indexOf( element ), 1);

        //Remove from the order
        dishOrdered.splice(dishOrdered.indexOf(dish), 1);

        //Delete the element
        element.remove();
        
        //Update the new price
        updateQuickView();
    }

    /**
     * Take a template of a dish to be displayed and assign it to its right category in the menu
     * @param {object} dish object of the dish that will be displayed
     * @param {object} element Template of the dish to be displayed in the menu
     */
    const assignCategorie = (dish, element) => {
        
        //Look at each categorie and compares it to the dish's category id
        for(let categorie of listCategories){

            //If the IDs are similars
            if(categorie.id_categorie === dish.id_categorie){

                //Find the object parent of the category and assign the template to it
                for ( let i = 0; i < html_categories.length; i++){

                    if(html_categories[i].id === categorie.nom){

                        //Add the template to that Node
                        html_categories[i].append(element);
                    }
                }
            }
        }

        //Add the new element to the categorie it matches
        for ( let i = 0; i < html_categories.length; i++){

            //Compare the dish's category to all the categories available
            if(html_categories[i].id === dish.categories){

                //Add the template to that Node
                html_categories[i].append(element);
            }
        }
    }

    /**
     * Sends the order to the server
     * @param {event} event button pressed (should be the confirm of the quickview)
     */
    const sendOrderToServer = (event) => {

        //Was used has place holder to be replaced with a form of validation
        let validate = true;

        //Prevent the page from reloading
        event.preventDefault();

        //Validate the elements to send on the server
        if(validate)
        {
            
            //Address to deliver the order
            let address = getAddressOrder();

            //Create an array with the objects to send
            let data = [address, dishOrdered, totalPrice];

            //Envoie le formulaire au serveur
            fetch('/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        //Empty the order so nothing is sent afterwards
        emptyOrder();
    }

    /**
     * Empty the list of dishes that were in the order
     */
    const emptyOrder = () =>
    {
        //Remove every view in the quickview 
        for(let view in listOrderViews)
        {
            listOrderViews[view].remove();
        }

        //Reset the lists
        dishOrdered = [];
        listOrderViews = [];

        //Update the new price
        updateQuickView();
    }

    /**
     * Cherche tout les plats sur le serveur.
     * Gets all the dishes on the server.
     */
    const getDishesServer = async () => {

        //fetch all the dishes on the DB
        let response = await fetch('/dishes');

        //if the answer it gets is (OK)
        if(response.ok){

            //Va stocker la réponse sous format JSON
            //Save the answer's informations as JSON
            let dishesArray = await response.json();

            //Ajoute la liste recu a la liste local
            //Add the array received to the local list
            listDishes = dishesArray;

            //For every dishes got from the server, add them to our menu
            for(let i = 0 ; i < listDishes.length ; i++){
                addDish(listDishes[i] , i);
            }
        }
    }
    
    /**
     * The the Address inserted in the quickview for the order
     */
    const getAddressOrder = () => {
            return document.getElementById('Address').value;
        }

    /**
     * Va chercher toutes les données des plats sur le serveur.
     * Get all the categories available on the server.
     */
    const getCategoriesServer = async () => {

        //Fetch the categories from the server
        let response = await fetch('/categories');

        //if the answer it gets is (OK)
        if(response.ok){

            //Va stocker la réponse sous format JSON
            //Save the answer's informations as JSON
            let categoriesArray = await response.json();

            //Ajoute la liste recu a la liste local
            //Add the array received to the local list
            listCategories = categoriesArray;
        }
    }

    /**
     * Connexion au serveur pour avoir les notifications en temps réel.
     * Connect to the server to get informations in realtime
     */
    const connecterTempsReel = async () => {
 
        let source = new EventSource('/notification');
/*
        //When the account is logged out
        source.addEventListener('updateState',() =>{
        });
*/
    }

    /**Used to logout the user */
    const logout = () =>{
        emptyOrder();
    }


    /**
     * Look to see which user is connected
     */
    const isConnected = async () => {
        return await fetch('/login');
    }

    //Listen to see if an even calling the log out is made
    document.body.addEventListener('logout', logout);

    //Assign the function to be executed by the confirm button once clicked
    btnConfirm.onclick = sendOrderToServer;

    //Connect in realtime (might be useless tho)
    connecterTempsReel();

    //Get the categories
    getCategoriesServer();

    //Get the dishes from the server
    getDishesServer();
})();