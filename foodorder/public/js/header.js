(() =>{

    // HTML element of the header
    let options;
    let loginOptions;
    let loginDiv;
    let idInput;
    let passwordInput;

    // Champs d'erreurs
    let idError;
    let passwordError;

    //Buttons
    let btnLogin;
    let btnLogout;

    // Get the navbar
    let navbar;
    let sticky;

    
    /**
     * Get the elements everytime the page changes
     */
    const getElements = () =>
    {
        // HTML element of the header
        options = document.getElementById("Options");
        loginOptions = document.getElementById("Login-Options");
        loginDiv = document.getElementById('Login-Inputs');

        idInput = document.getElementById('connectionID');
        passwordInput = document.getElementById('password');

        idError = document.getElementById('id-error');
        passwordError = document.getElementById('password-error');

        btnLogin = document.getElementById('btnLogin');
        btnLogout = document.getElementById('btnLogout');

        navbar = document.getElementById("NavBar");
  
        //The offset is the height of the header before the navbar
        sticky = navbar.offsetTop;
    } 

    getElements();

    //When the page is scrolled
    onscroll = () =>{

        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
          } else {
            navbar.classList.remove("sticky");
          }
    }
    
    /**
     *  When the button to login is clicked, on the first click it will look if the inputs are hidden,
     *  if they are NOT, it will display them
     *  if they are, it will log itself
     */
    btnLogin.onclick = async () =>
    {
        if(loginDiv.classList.contains('hidden'))
        {
            loginDiv.classList.remove('hidden');
        }
        else
        {
            //Try to log in and receive the answer from the server
            let response = await login();

            //If the server doesn't say its OK, the error elements are being displayed
            if(!response.ok)
            {
                idError.classList.add("visible");
                passwordError.classList.add("visible");
            }
            else
            {
                setHeader();
            }
        }
    }
    btnLogout.onclick = async () =>
    {
        fetch('/logout');
        loginDiv.classList.remove('hidden');
        setHeader();
        document.body.dispatchEvent(new CustomEvent('logout'));
        window.location.replace("index.html");
    }

    const login = async ()=>{

        //Gets values from the inputfields
        let id = idInput.value;
        let password = passwordInput.value;

        //Make an object of the values to be sent at the server
        let data = {id,password};

        //Send the data to the server
        //Also returns the response from the server
        return await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    const setHeader = async () =>{

        idError.classList.remove("visible");
        passwordError.classList.remove("visible");

        let response = await fetch('/login');

        /** Evaluate if it has a session */
        if(response.ok){
            //Hide the login options and display the account options
            loginOptions.classList.add("hidden");
            options.classList.remove("hidden");
        }
        else
        {
            //Display the login and sign up buttons
            loginOptions.classList.remove("hidden");
            options.classList.add("hidden");
        }
    }

    setHeader();

})();

