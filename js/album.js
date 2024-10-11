let albumJson ="";
let album

document.addEventListener("DOMContentLoaded", async ()=>{
    album = await todayAlbum();
    displayAlbum(album);

    //guardar review del usuario.
    document.getElementById('saveReview').addEventListener('click', saveReview);
    albumComments();
    displayUserReview();
});

/*
document.addEventListener("DOMContentLoaded", async ()=>{

    albumJson = await readJSON('./data/albums.json')
    .then(data => {
    //Elijo album al azar
    let min=0;
    let max=data.length;

    let choice = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("album numero: "+choice);
    //console.log(data[choice])
    return data[choice];
    })
    .catch(error => {
    console.error('Error al cargar JSON:', error);
    });

    displayAlbum(albumJson);

    //review del usuario
    //userData = getUserData();
    //console.log(userData);
    
    if(userData.history.some(element => element.albumId === albumJson.id)){
        //hay review
        console.log("Hay review");
        displayUserReview(albumJson.id);
    }
    
    
    //displayUserReview(albumJson.id);

    //Muestro contenido para review
    //document.querySelector('input[name="reviewRadioOptions"]:checked').value
    //displayUserReview();

});
*/
async function albumComments(){
    console.log("albumComments")
    let data = await getComments(album.id);
    let content ="";
    data.forEach( review => {
        content +=`
        <div>
            <div>
            <p class="fs-5 mb-0">${review.username}</p>`

        for(let i=1; i<=5 ; i++){
            if(i<=review.score){
                content+=`<label class="star star-on">★</label>`
            }else{
                content+=`<label class="star star-off">★</label>`
            }

        }
        content+=
            `</div>
                <div class="col fs-5 text-center fst-italic">
                <p>“${review.review}"</p>
            </div>
        <hr>
        </div>`
        });
    document.getElementById("reviews").innerHTML=content;

}

function displayAlbum(album){
    console.log("displayAlbum");
    //console.log(album);
    //recupero artistas
    let artists="";
    album.artists.forEach(artist => {
        artists +=artist.name+" ";
    });

    //tracklist table
    let tracklistTable=`
            <table class="table table-dark">
                <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                    <tbody>`;
    album.tracks.items.forEach(track =>{
        tracklistTable+=`
                    <tr>
                        <th scope="row">${track.track_number}</th>
                        <td>${track.name}</td>
                        <td>${formatMilliseconds(track.duration_ms)}</td>
                    </tr>
                    `
    });
    tracklistTable+=`</tr>
                    </tbody>
                  </table>`;
    let response = `
            <div id="tapa" class="col-md-10 justify-content-center align-items-center">
                <img src="${album.images[0].url}" class="cover" alt="...">
            </div>
            <div class="col-md-6">
                <div id="title"><h1>${album.name}</h1></div>
                <div id="artist" class="mb-3"><h3>${artists}</h3></div>
                <div id="tracks">`+tracklistTable;

    document.getElementById("albumRow").innerHTML=response;
}
/*
function displayUserReview(albumId){
    let userData = getUserData();
    let albumReview = "";
    let content ="";
    userData.history.forEach(album =>{
        if(album.albumId == albumId ){
            albumReview = album;
        }
    });

    if(albumReview != "" ){
        content =`
            <div>
                <p class="fs-5 mb-0">Tu calificacion:</p>`

        for(let i=1; i<=5 ; i++){
            if(i<=albumReview.score){
                content+=`<label class="star star-on">★</label>`
            }else{
                content+=`<label class="star star-off">★</label>`
            }

        }
        content+=
            `</div>
                <div class="col fs-5 text-center fst-italic">
                <p>“${albumReview.review}"</p>
            </div>`
    }
    document.getElementById("userReview").innerHTML=content;
    console.log("User review");
    console.log(albumReview);
}
*/

//Guarda la calificación del usuario
function saveReview(){
    console.log("saveReview: Guardo calificacion.")
    //recupero calificacion
    let calificacion = document.querySelector('input[name="reviewRadioOptions"]:checked').value
    //recupero comentarios
    let comentarios = document.getElementById("reviewTextarea").value;
    if(setUserReview(album.id, calificacion, comentarios)){
        //ok
        displayUserReview();
    }

}

//Muestra review del usuario
function displayUserReview(){
    console.log("displayUserReview: "+album.id);
    let content ='';
    let userReview = getUserReview(album.id);
    if(userReview != undefined && userReview.score > 0){
        //existe review.
        content =`
            <div>
                <p class="fs-5 mb-0">Tu calificacion:</p>`

        for(let i=1; i<=5 ; i++){
            if(i<=userReview.score){
                content+=`<label class="star star-on">★</label>`
            }else{
                content+=`<label class="star star-off">★</label>`
            }

        }
        content+=
            `</div>
                <div class="col fs-5 text-center fst-italic">
                <p>“${userReview.review}"</p>
            </div>`
    document.getElementById("userReview").innerHTML=content;
    }
    
}
