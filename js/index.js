
document.addEventListener("DOMContentLoaded", () =>{
    console.log("falopa");
    //login
    document.getElementById("loginButton").addEventListener("click", login);
    //registro
    document.getElementById("registerButton").addEventListener("click", register);
    //Recupero lista de discos.
})


function register(){
    console.log("entro a register");
    let username = document.getElementById("registerUser");
    let email = document.getElementById("registerEmail");
    console.log("Usuario:"+username.value);
    console.log("Email:"+email.value);
    if(username.value == '' ){
        username.classList.add("is-invalid");
    }

}

function login(){}