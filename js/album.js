let albumJson ="";


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
    //displayUserReview(albumJson.id);

});



function displayAlbum(album){
    console.log("Album");
    console.log(album);
    //recupero artistas
    let artists="";
    album.artists.forEach(artist => {
        artists +=artist.name+" ";
    });

    //tracklist table
    let tracklistTable=`
            <table class="table table-dark ">
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
            <div class="col-md-6  d-flex justify-content-center align-items-center">
                <!--<img src="${album.images[0].url}" class="cover" alt="...">-->
            </div>
            <div class="col-md-6">
                <div id="title"><h1>${album.name}</h1></div>
                <div id="artist" class="mb-3"><h3>${artists}</h3></div>
                <div id="tracks">`+tracklistTable;

    document.getElementById("albumRow").innerHTML=response;
}

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
            <div><p>Tu calificacion: ${albumReview.score}/5</p></div>
                <div class="col fs-5 text-center fst-italic">
                <p>“${albumReview.review}"</p>
            </div>`
    }else{
        content =`
            <div></div>
                <div class="col fs-5 text-center fst-italic">
                <p>Todavia no has calificado este album</p>
            </div>`
    }
    document.getElementById("userReview").innerHTML=content;
    console.log("User review");
    console.log(albumReview);
}