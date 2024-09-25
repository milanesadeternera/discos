
document.addEventListener("DOMContentLoaded", () =>{
    console.log("falopa");
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
            console.log("info correcta");
            window.location.href = "album.html";
        }
    }
}

function login(){}