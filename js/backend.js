


//Registrar Usuario
function register(username, email){
    console.log("Creo Usuario: "+username);
    userData.username=username;
    userData.email=email;

    let checkUser = getUserData(username);
    if(checkUser === undefined){
        //usuario no existe
        createUser(username, email);
        return true;
    }else{
        //usuario ya existe
        return false;
    }
}

//Asignar Album diario.
async function setDailyAlbum(user){
    let userData = getUserData(user);
    let albumsId = await getAlbumsId();

    //lista de history album ids.
    let historyId = userData.history.map(review => review.albumId);
    //historyId = ['5QuLV3XtfsdR4ujUcg9xd5', '57DyIWEyjXm0hqeVX0dk36', '2eLIA8Rhn0XTpfJxnFzaa5', '1B9nXYbMosOfWLlSrE8Q3r', '34ywELgakejCKU2p37wJJ8', '1ZRH0AAHXlUFCw2e0Ch5b9', '6zMQ2vluMVTM250k3ztUT5', '0OehuG8E9aCUx9lJWfMiqI', '5LigBf2htSs8LEH14NyNlc', '3kBxndgqMkPpGNe7ShLONu', '2xCPpaygS77Kui44LYBwsl', '2oNkyLOrpSqk2EllB0kOdw', '5pTHKFpXgoOTcWa6Qar4NK']
    //Creo array sin album en historial
    let options = albumsId.filter(album => !historyId.includes(album));
    console.log(options);
    if(options.length>=1){
        let asignedAlbum = options[Math.floor(Math.random() * (options.length))];
        console.log("Nuevo disco "+asignedAlbum)
        //guardo data
        userData.history.push({albumId:asignedAlbum, date: getDate(), score: -1 , review: ""})
        setUserData(userData)
    }

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