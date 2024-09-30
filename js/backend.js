/*====================================================================
Este js agrupa las operaciones que deberian realizarese en un backend.
Si leiste esto gracias por tu interés.
====================================================================*/

//Obtener fecha actual en formato dd/mm/yyyy
function getDate() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`; 
}

//Registrar Usuario
function register(username, email){
    console.log("Creo Usuario: " + username);
    userData.username=username;
    userData.email=email;
    //Logica de validaciond e datos iría acá
    createUser(username, email);
    //Asigno el primer disco.
    setDailyAlbum();
    return true;
}


//Asignar Album diario.
async function setDailyAlbum(){
    let userData = getUserData();
    let albumsId = await getAlbumsId();

    //lista de history album ids.
    let historyId = userData.history.map(review => review.albumId);
    //historyId = ['5QuLV3XtfsdR4ujUcg9xd5', '57DyIWEyjXm0hqeVX0dk36', '2eLIA8Rhn0XTpfJxnFzaa5', '1B9nXYbMosOfWLlSrE8Q3r', '34ywELgakejCKU2p37wJJ8', '1ZRH0AAHXlUFCw2e0Ch5b9', '6zMQ2vluMVTM250k3ztUT5', '0OehuG8E9aCUx9lJWfMiqI', '5LigBf2htSs8LEH14NyNlc', '3kBxndgqMkPpGNe7ShLONu', '2xCPpaygS77Kui44LYBwsl', '2oNkyLOrpSqk2EllB0kOdw', '5pTHKFpXgoOTcWa6Qar4NK']
    //Creo array sin album en historial
    let options = albumsId.filter(album => !historyId.includes(album));
    console.log(options);
    if(options.length>=1){
        let asignedAlbum = options[Math.floor(Math.random() * (options.length))];
        console.log("Nuevo disco: "+asignedAlbum)
        //guardo data
        userData.history.push({albumId:asignedAlbum, date: getDate(), score: -1 , review: ""})
        setUserData(userData)
    }

    return asignedAlbum;
}

//Obtiene disco de hoy.
async function todayAlbum(){
    let today = getDate();
    let userData = getUserData();
    let todayAlbum = userData.history.find(album => album.date == today);
    if(todayAlbum === undefined){
        todayIdAlbum = setDailyAlbum();
    }else{
        todayIdAlbum = todayAlbum.albumId;
    }
    console.log("Today Album:"+todayIdAlbum);
    let coso =  await getAlbum(todayIdAlbum);
    return coso;
}


