const storageKey="LosDiscosCoco";
let userData = {
    "username":"",
    "email":"",
    "history": []
  }



//Registrar Usuario
function register(username, email){
    console.log("creousu")
    console.log(username)
    console.log(typeof(username))
    userData.username=username;
    userData.email=email;
    localStorage.setItem(storageKey, JSON.stringify(userData));
    return true;
}

//Asignar Album diario.
async function setDailyAlbum(user){
    let userData = getUserData(user);
    let albumsId = await getAlbumsId();
    console.log(albumsId);

    //lista de history album ids.
    let historyId = userData.history.map(review => review.albumId);
    historyId = ['5QuLV3XtfsdR4ujUcg9xd5', '57DyIWEyjXm0hqeVX0dk36', '2eLIA8Rhn0XTpfJxnFzaa5', '1B9nXYbMosOfWLlSrE8Q3r', '34ywELgakejCKU2p37wJJ8', '1ZRH0AAHXlUFCw2e0Ch5b9', '6zMQ2vluMVTM250k3ztUT5', '0OehuG8E9aCUx9lJWfMiqI', '5LigBf2htSs8LEH14NyNlc', '3kBxndgqMkPpGNe7ShLONu', '2xCPpaygS77Kui44LYBwsl', '2oNkyLOrpSqk2EllB0kOdw', '5pTHKFpXgoOTcWa6Qar4NK']
    //Creo array sin album en historial
    let options = albumsId.filter(album => !historyId.includes(album));
    if(options.length>=1){
        let choice = options[Math.floor(Math.random() * (options.length + 1))];
        console.log("Nuevo disco "+choice)
        //guardo data
        userData.history.push({albumId:choice, date: getDate(), score: -1 , review: ""})
        setUserData(userData)
    }

    return choice;
}


//Recupero info de usuario
function getUserData(){
    let userData = JSON.parse(localStorage.getItem(storageKey));
    return userData;
}
function setUserData(data){
    localStorage.setItem(storageKey,JSON.stringify(data))
    return true;
}

//Obtener fecha actual en formato dd/mm/yyyy
function getDate() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`; 
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