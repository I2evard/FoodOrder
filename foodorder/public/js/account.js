(() => {

    //variable for the form of the user
    let form = document.getElementById("user-form");
    
    //variable for the id of the user
    let id = document.getElementById("id");

    //variable for the firstName of the user
    let firstName = document.getElementById("firstName");
        
    //variable for the lastName of the user
    let lastName = document.getElementById("lastName");
            
    //variable for the password of the user
    let password = document.getElementById("password");
        
    //variable for the confirmPassword of the user
    let confirmPassword = document.getElementById("confim_password");
            
    //variable for the erreur message of the id of the user
    let id_erreur = document.getElementById("id-error");
             
    //variable for the erreur message of the first name of the user
    let firstNameError = document.getElementById("firstName-error");
                 
    //variable for the erreur message of the last name of the user
    let lastNameError = document.getElementById("lastName-error");
                 
    //variable for the erreur message of the password of the user
    let passwordError = document.getElementById("password-error");
                     
    //variable for the erreur message of the confirm password of the user
    let confirmPasswordError = document.getElementById("confim_password-error");

    /**
     * Name: ValidateID
     * Desciption: this function verifies if the ID input of the user is valid. 
     * if not, show the error message and show the correct message 
     */
    const validateID = () => {
        //if the ID is valide, then execute the following code 
        if(id.validity.valid){
            // set the error text to nothing ( empty String)
            id_erreur.innerText = ' ';

            // remove the CSS class error from id_erreur removing the error from the page
            id_erreur.classList.remove("error");

            // remove the CSS class active from ID removing the error from the page
            id.classList.remove("active");
        }
        //if the Id is not valid then: 
        else{
            // check if the value is missing(user didn't enter a value as an ID)
            // if it's true then execute the following code
            if(id.validity.valueMissing){
                //set the error text to Please enter an ID 
                id_erreur.innerText = 'Please enter an ID';
            }
            // check if the value is tooLong(user entered a ID too long)
            // if it's true then execute the following code
            if(id.validity.tooLong){
                //set the error text to Your ID is too long'
                id_erreur.innerText = 'Your ID is too long';
            }

            // adding the CSS class error from id_erreur displaying the error on the page    
            id_erreur.classList.add("error");

            // adding the CSS class active from ID displaying the error on the page
            id.classList.add("active");
        }
    }
    
    /**
     * Name: validateFirstName
     * Desciption: this function verifies if the firstName input of the user is valid. 
     * if not, show the error message and show the correct message 
     */
    const validateFirstName = () => {
        //if the firstName is valide, then execute the following code
        if(firstName.validity.valid){
            // set the error text to nothing ( empty String)
            firstNameError.innerText = ' ';
            // remove the CSS class error from firstNameError removing the error from the page            
            firstNameError.classList.remove("error");

            // remove the CSS class active from firstName removing the error from the page
            firstName.classList.remove("active");
        }
        //if the firstName is not valid then: 
        else{
            // check if the value is missing(user didn't enter a value as a firstName)
            // if it's true then execute the following code
            if(firstName.validity.valueMissing){
                //set the error text to Your ID is too long'
                firstNameError.innerText = 'Please enter your name';
            }
            // check if the value is tooLong(user entered a firstName too long)
            // if it's true then execute the following code
            if(firstName.validity.tooLong){
                //set the error text to Your ID is too long'
                firstNameError.innerText = 'Your first name is too long';
            }

            // adding the CSS class error from firstNameError displaying the error on the page    
            firstNameError.classList.add("error");
            // adding the CSS class active from firstName displaying the error on the page    
            firstName.classList.add("active");
        }
    }

    /**
     * Name: validateFirstName
     * Desciption: this function verifies if the lastName input of the user is valid. 
     * if not, show the error message and show the correct message 
     */
    const validateLastName = () => {
        //if the ID is valide, then execute the following code
        if(lastName.validity.valid){
            // set the error text to nothing ( empty String)
            lastNameError.innerText = ' ';
            // remove the CSS class error from firstNameError removing the error from the page            
            lastNameError.classList.remove("error");
            // remove the CSS class error from firstNameError removing the error from the page            
            lastName.classList.remove("active");
        }
        else{
            // check if the value is missing(user didn't enter a value as an ID)
            // if it's true then execute the following code
            if(lastName.validity.valueMissing){
                //set the error text to Your ID is too long'
                lastNameError.innerText = 'Please enter a last name';
            }
            // check if the value is tooLong(user entered a lastName too long)
            // if it's true then execute the following code
            if(lastName.validity.tooLong){
                //set the error text to Your ID is too long'
                lastNameError.innerText = 'Your last name is too long';
            }

            // adding the CSS class active from firstName displaying the error on the page    
            lastNameError.classList.add("error");
            // adding the CSS class active from firstName displaying the error on the page    
            lastName.classList.add("active");
        }
    }

    /**
     * Name: validateFirstName
     * Desciption: this function verifies if the lastName input of the user is valid. 
     * if not, show the error message and show the correct message 
     */
    const validatePassword = () => {
        //if the ID is valide, then execute the following code
        if(password.validity.valid){
            // set the error text to nothing ( empty String)
            passwordError.innerText = ' ';
            // remove the CSS class error from firstNameError removing the error from the page            
            passwordError.classList.remove("error");
            // remove the CSS class error from firstNameError removing the error from the page            
            password.classList.remove("active");
        }
        else{
            // check if the value is missing(user didn't enter a value as an ID)
            // if it's true then execute the following code
            if(password.validity.valueMissing){
                //set the error text to Your ID is too long'
                passwordError.innerText = 'Please enter a password';
            }
            // check if the value is tooLong(the password of the user is too long)
            // if it's true then execute the following code
            if(password.validity.tooLong){
                //set the error text to Your ID is too long'
                passwordError.innerText = 'Your password is too long';
            }

            // adding the CSS class active from firstName displaying the error on the page    
            passwordError.classList.add("error");
            // adding the CSS class active from firstName displaying the error on the page    
            password.classList.add("active");
        }
    }

    /**
     * Name: validateFirstName
     * Desciption: this function verifies if the confirmPassword input of the user is valid. 
     * if not, show the error message and show the correct message 
     */
    const validateconfirm = () => {
        //if the ID is valide, then execute the following code
        if(confirmPassword.validity.valid){
            // if the password is the same as the comfirm password, the execute the following code
            if(password.value !== confirmPassword.value){
                // set the error text to "password doesn't match"
                confirmPasswordError.innerText = "password doesn't match";
                // adding the CSS class error from confirmPasswordError displaying the error on the page    
                confirmPasswordError.classList.add("error");
                // adding the CSS class active from confirmPassword displaying the error on the page    
                confirmPassword.classList.add("active");
            }
            else{
                // set the error text to nothing ( empty String)
                confirmPasswordError.innerText = '';
                // remove the CSS class error from confirmPasswordError removing the error from the page            
                confirmPasswordError.classList.remove("error");
                // remove the CSS class active from confirmPassword removing the error from the page            
                confirmPassword.classList.remove("active");
            }
            }
            
        else{
            // check if the value is missing(user didn't enter a value to confirm his password)
            // if it's true then execute the following code
            if(confirmPassword.validity.valueMissing){
                //set the error text to 'Please confirm your Password'
                confirmPasswordError.innerText = 'Please confirm your Password';
            }

            // adding the CSS class error from confirmPasswordError displaying the error on the page    
            confirmPasswordError.classList.add("error");
            // adding the CSS class active from confirmPassword displaying the error on the page    
            confirmPassword.classList.add("active");
        }
    }
    // add listener to the id input box when an input is made.   
    id.addEventListener('input', validateID);
    
    // add a listener to the id input box when the user leave the input box.  
    id.addEventListener('blur', validateID);

    //add the validateID function to te submit button of the form. 
    form.addEventListener('submit', validateID);

    // add listener to the firstName input box when an input is made.  
    firstName.addEventListener('input', validateFirstName);

    // add a listener to the firstName input box when the user leave the input box.  
    firstName.addEventListener('blur', validateFirstName);

    //add the validateFirstName function to te submit button of the form. 
    form.addEventListener('submit', validateFirstName);

    // add listener to the lastName input box when an input is made.  
    lastName.addEventListener('input', validateLastName);
    
    // add a listener to the lastName input box when the user leave the input box. 
    lastName.addEventListener('blur', validateLastName);
    
    //add the validateLastName function to te submit button of the form. 
    form.addEventListener('submit', validateLastName);

    // add listener to the password input box when an input is made.  
    password.addEventListener('input', validatePassword);
        
    // add a listener to the password input box when the user leave the input box. 
    password.addEventListener('blur', validatePassword);
    
    //add the validatePassword function to te submit button of the form. 
    form.addEventListener('submit', validatePassword);

    // add listener to the confirmPassword input box when an input is made.  
    confirmPassword.addEventListener('input', validateconfirm);
            
    // add a listener to the confirmPassword input box when the user leave the input box.
    confirmPassword.addEventListener('blur', validateconfirm);
    
    //add the validateconfirm function to te submit button of the form. 
    form.addEventListener('submit', validateconfirm);

    
    const sendNewAccountToServer = (event) => {
        // stop the form from refreshing the page
        event.preventDefault();

        // send the form only if it's valid
        if(form.checkValidity()){

            // build an object with the form
            let formData = formToObject(form);

            // send the data on the server
            fetch('/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
    }

    //add the sendNewAccountToServer function to te submit button of the form. 
    form.addEventListener('submit', sendNewAccountToServer);
})();