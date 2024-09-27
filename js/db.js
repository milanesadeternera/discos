/*
Este archivo agrupa y simula el manejo de la base de datos.
Para este proyecto la informacion se guarda en localstorage
Por lo que todo lo que sea manipular localstorage se realiza desde acá
*/
let users=[];
let activity=[];

const storageKey="LosDiscosUy";
let userData = {
    "username":"",
    "email":"",
    "history": []
  }




//Recupero info de usuario
function getUserData(findUser){
    let users = JSON.parse(localStorage.getItem(storageKey)).users;
    if(findUser != ""){
        let user = users.filter( user => user.username == findUser)[0];
        return user;
    }else{
        return users;
    }
}
function setUserData(data){
    localStorage.setItem(storageKey,JSON.stringify(data))
    return true;
}
function createUser(username, email){
    console.log("usuarios:")
    //nfo = await readJSON("./data/users.json");
    info = JSON.parse(localStorage.getItem(storageKey));
    users= info.users;
    console.log(users);
    let maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    users.push({id : maxId+1, username : username , email : email})
    
    info.users = users;
    console.log(info);
    localStorage.setItem(storageKey, JSON.stringify(info));
    return true;
}


//Funcion que crea el localstorage.
async function createDb(){
    if(localStorage.getItem(storageKey) == null){
        console.log("creo DB")
        users = await readJSON("./data/users.json");
        activity = await readJSON("./data/activity.json");
        let info = {"users": users , "activiy": activity};
        localStorage.setItem(storageKey, JSON.stringify(info));
    }/*else{
        //cargo info en variable global.
        console.log("cargo DB");
        users = JSON.parse(localStorage.getItem(storageKey)).users;
        activity = JSON.parse(localStorage.getItem(storageKey)).activity;
    }*/

}

async function readJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convierte la respuesta en JSON
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
  }