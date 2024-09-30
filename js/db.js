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

//Funcion que crear el localstorage.
function createDb(){
    if(localStorage.getItem(storageKey) == null){
        console.log("creo DB")
        localStorage.setItem(storageKey, JSON.stringify(userData));
    }
}
//Recupero info de usuario
function getUserData(){
    let userData = JSON.parse(localStorage.getItem(storageKey));
    return userData;
}
//Guardo informacion del usuario
function setUserData(data){
    localStorage.setItem(storageKey,JSON.stringify(data))
    return true;
}

//Creo usuario 
function createUser(username, email){
    console.log("DB Creo Usuario:");
    data = JSON.parse(localStorage.getItem(storageKey));
    data.username = username;
    data.email = email;

    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
}

//Obtener informacion de Album.
async function getAlbum(albumId){
    let data = await readJSON('./data/albums.json');
    let album = data.find(album => album.id === albumId);
    console.log("getAlbum: "+album.id);
    return album;
}

//cargar array con albumsId
async function getAlbumsId(){
    return readJSON('./data/albums.json')
    .then(data => {
        let albumsId = data.map( album => album.id);
        return albumsId;
    })
    .catch(error => {
        console.error('Error al cargar JSON:', error);
    });
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