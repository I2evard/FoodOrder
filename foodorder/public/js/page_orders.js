(()=>{

    let ordersContainer = document.getElementById('Orders-Container');
    let orderTemplate = document.getElementById('Order');
    let listOrderTemplates = [];
    let dishTemplate = document.getElementById('Dish');
    let stateTemplate = document.getElementById('State');
    let checkBoxContainer = document.getElementById('Checkbox-Container');
    let checkBoxTemplate = document.getElementById('CheckBox-Element');
    let checkboxes = [];
    let listOrders;
    let ordersStates;
    let buttons = [];
    let accType;

    const addZero = (i) =>{
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    const createDisplay = (order) =>{

        //Clone un nouvel élément du template "orderTemplate"
        //Clone a new element from the template "orderTemplate"
        let newTemplate = orderTemplate.cloneNode(true);

        //Remove if from the hidden class since this one needs to be visible
        newTemplate.classList.remove("hidden");

        /**Assign an index to the template according to the id of the order */
        newTemplate.index = order.id_commande;
        newTemplate.value = order;

        newTemplate.querySelector("#Total-Price").innerText = "Total: "+  order.prix_total.toFixed(2) + "$";

        /**Format the informations of the user */
        let firstName = order.prenom.charAt(0).toUpperCase() + order.prenom.slice(1);
        let lastName = order.nom.charAt(0).toUpperCase() + order.nom.slice(1);

        newTemplate.querySelector("#Client-Name").innerText = firstName + " " + lastName;

        newTemplate.querySelector("#Address").innerText = order.adresse;

        let date = new Date(order.date_livraison);
        let dateToDisplay = date.getDate() + "/" + 
                            (date.getMonth()+1) + "/" +
                            date.getFullYear()+ " " +
                            addZero(date.getHours())+":"+
                            addZero(date.getMinutes());
        newTemplate.querySelector("#Date").innerText = dateToDisplay;

        let dropDown = newTemplate.querySelector("#myDropdown");
        let stateButton = newTemplate.querySelector("#btnDropdown");

        stateButton.index = newTemplate.index;
        buttons.push(stateButton);

        //If it is not a user
        if(accType !== 1){
            //Generate the dropdown elements 
            generateStates(dropDown, order);
        }
        else
        { 
            //Deactivate the button for the regular users
            stateButton.disabled = true;
            stateButton.classList.add("disabled");
        }

        stateButton.onclick = (event) =>
        {
            event.target.parentNode.querySelector("#myDropdown").classList.toggle("show-content");
        }

        updateState(order.id_etat_commande, order);

        ordersContainer.insertBefore(newTemplate, ordersContainer.firstChild);
        
        listOrderTemplates.push(newTemplate);

        return newTemplate;
    }

    /**Generate checkboxes to display or hide the orders accordingly to their state */
    const generateCheckBox = () =>{

        //For each states an order can be
        for(let i = 0 ; i < ordersStates.length; i++){

            //Clone un nouvel élément du template 
            //Clone a new element from the template
            let newTemplate = checkBoxTemplate.cloneNode(true);
            newTemplate.classList.remove("hidden");
            newTemplate.index = i;
            newTemplate.querySelector("#Label").innerText = ordersStates[i].nom.charAt(0).toUpperCase() + ordersStates[i].nom.slice(1);
            newTemplate.querySelector("#CheckBox").index = i;
            newTemplate.querySelector("#CheckBox").checked = true;
            checkBoxContainer.append(newTemplate);
            checkboxes.push(newTemplate.querySelector("#CheckBox"));

            //Add a listener that will display or hide the orders accordingly to their state
            newTemplate.querySelector("#CheckBox").addEventListener('change', changeDisplay);
            
        }
    }

    /**
     * Display or hide the orders accordingly to their state
     * @param {Int} idx index of the state to hide or display 
     */
    const changeDisplay = (event) => {

        /**Look at all the orders */
        for(let i = 0 ; i < listOrderTemplates.length; i++)
        {
            if(event.target.index === listOrderTemplates[i].value.id_etat_commande-1)
            {
                //If it was checked
                if(event.target.checked)
                {
                    listOrderTemplates[i].classList.remove("hidden");
                }
                else
                {
                    listOrderTemplates[i].classList.add("hidden");
                }
            }
        }
    }

    const generateStates = (dropDown, order) =>{

        /**Creates options according for every order's states possible */
        for(let i = 0 ; i < ordersStates.length; i++){

            /**Clone from the template of anchors */
            let newStateTemplate = stateTemplate.cloneNode(true);

            newStateTemplate.index = i;

            /** formating the names of the states */
            let stateName = ordersStates[i].nom.charAt(0).toUpperCase() + ordersStates[i].nom.slice(1);

            newStateTemplate.addEventListener('click', ()=>{
                updateState(newStateTemplate.index + 1, order);

                updateStateServer(newStateTemplate.index + 1, order);
            });

            /**Remove the tag hidding the template */
            newStateTemplate.classList.remove("hidden");

            /**Assign the names to the anchors */
            newStateTemplate.innerText = stateName;

            /**link that anchor to the dropdown menu */
            dropDown.append(newStateTemplate);
        }
    }

    const displayElements = (template, dish) => {

        let dishes = template.querySelector("#Dishes");
        newDishTemplate = dishTemplate.cloneNode(true);
        newDishTemplate.classList.remove("hidden");

        newDishTemplate.querySelector("#Name").innerText = dish.food_name;
        newDishTemplate.querySelector("#Qty").innerText = dish.quantite;
        newDishTemplate.querySelector("#Price").innerText = dish.prix.toFixed(2)+ "$";

        dishes.append(newDishTemplate);

    }

    const updateState = async (state_id, order) =>{

        order.id_etat_commande = state_id;

        for(let i = 0; i < buttons.length; i++)
        {
            if(buttons[i].index === order.id_commande)
            {
                buttons[i].innerHTML = ordersStates[order.id_etat_commande-1].nom.charAt(0).toUpperCase() + ordersStates[order.id_etat_commande-1].nom.slice(1);
            }
        }
    }

    const updateStateServer = async (state_id, order) =>{
        let data = [state_id, order];
        fetch('/orders',{
            method:'PATCH',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    const displayOrders = async (orders) =>{
        /**
         * Saves the id of the order that will be created
         * Prevents to create multiple displays for the same order since the list is build based on the dishes
         *  */
        let currentOrderId = 0;
        let template;
        
        /**For each orders */
        for(let i = 0; i < orders.length; i++){

            /** If the current id looked at isn't the same has one in the list, create a display for that one*/
            if(currentOrderId !== orders[i].id_commande)
            {
                template = createDisplay(orders[i]);
                currentOrderId = orders[i].id_commande;
            }

            /**
             * If the id of the order === template's index 
             * (index -> its order's id) 
             * */
            if(orders[i].id_commande === template.index){
                //Send the element's informations to the template so it can generate the informations related
                displayElements(template, orders[i]);
            }
        }
    }

    /**
     * Aller chercher toutes orders sur le serveur
     * Go get all the orders made on the server
     */
    const getOrders = async () =>{

        //Va chercher une réponse sur banqueFilm
        let response = await fetch('/orders');

        //if the answer it gets is (OK)
        if(response.ok){

            //Va stocker la réponse sous format JSON
            //Save the answer's informations as JSON
            listOrders = await response.json();

            //Ajoute la liste recu a la liste local
            //Add the array received to the local list
            displayOrders(listOrders);
        }
    }

    const getNewOrderServer = async () =>{

        /**Post the id to go fetch the element added */
        let response = await fetch('/New-Orders');

        if(response.ok)
        {
            let data = await response.json()
            for(let i = 0; i < data.length; i++){
                displayOrders(data[0]);
            }
        }
    }

    const getStates = async () =>{
        //Va chercher une réponse sur banqueFilm
        let response = await fetch('/states');

        //if the answer it gets is (OK)
        if(response.ok){
            //Va stocker la réponse sous format JSON
            //Save the answer's informations as JSON
            ordersStates = await response.json();
        }
        generateCheckBox();
    }

    const addOrderToView = async (order) =>{
       let template = createDisplay(order);
       displayElements(template, order);
    }

    /**
     * Connexion au serveur pour avoir les notifications en temps réel.
     * Connection with the server in real time to get the modifications on the order
     */
    const realTime = () => {
        let source = new EventSource('/notification');

        source.addEventListener('updateState', (event) => {
            event.preventDefault();
            let data = JSON.parse(event.data);

            updateState(data[0], data[1]);
            
        });

        source.addEventListener('add', (event) => {
            event.preventDefault();

            //Go get the new orders
            getNewOrderServer();

        });
    }

    /**
     * Return if the session's user is client or not
     */
    const getAccType = async () =>{
        let response = await fetch('/accType');
        
        if(response.ok){
            accType = await response.json();
        }
        console.log( accType);
    }

    window.onclick = (event) =>{
        if(!event.target.matches('.dropbtn'))
        {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for(let i = 0; i < dropdowns.length; i++){
                let openDropdown = dropdowns[i];
                if(openDropdown.classList.contains("show-content"))
                {
                    openDropdown.classList.remove("show-content");
                }
            }
        }
    }
    
    getStates();
    getOrders();
    realTime();
    getAccType();

})();