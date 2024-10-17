document.addEventListener("DOMContentLoaded", async ()=>{
    makeList();
})

let albumsId="";
async function makeList(){
    let list = document.getElementById("list");
    let userData = getUserData();
    let albumsId = await getAlbumsId();
    let content = "";
    let artist="";

    albumsId.forEach(async albumId => {
        let albumData = await getAlbum(albumId);
        content = `
        <li class="list-group-item">
            <p class="fs-3 mb-0">${albumData.name}</p>
        `;
        //Artistas
        if(albumData.artists.length > 0){
            artist = albumData.artists.map(artist => artist.name).join(", ");
        }else{
            artist = albumData.artists[0].name
        }

        content +=`
            <p class="fs-5 artist">${artist}</p>
        </li>
        `;
        list.innerHTML +=content;
    });
}