
document.addEventListener("DOMContentLoaded", () =>{
    console.log("index");
    //usuario creado?
    let userData = getUserData();
    if(userData.username != '' ){
        window.location.href = "album.html";
    }
    //login
    document.getElementById("loginButton").addEventListener("click", login);
    //registro
    document.getElementById("registerButton").addEventListener("click", registerForm);
})


function registerForm(){
    let username = document.getElementById("registerUser");
    let email = document.getElementById("registerEmail");
    console.log("Usuario:"+username.value);
    console.log("Email:"+email.value);
    //valido informacion ingresada.
    if(validForm(username, "username") && validForm(email, "email")){
        if(register(username.value, email.value)){
            window.location.href = "album.html";
        }
    }
}

function login(){}