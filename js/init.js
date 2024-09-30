const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/*
Reviso que el localstorage esté iniciado con la informacion necesaria
Para funcionar la página
*/
createDb();


//crea usuario ficticio
/*
async function crearUsuario(){
  localStorage.removeItem("discos");
  await fetch('./data/fakeUser.json')
    .then((response) => response.json())
    .then((json) => 
      localStorage.setItem("discos",JSON.stringify(json))
    );

}
*/
async function readJSON(url) {
    try {
      const response = await fetch(url);
  
      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      // Convierte la respuesta en JSON
      const data = await response.json();
      return data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-lanza el error para que pueda ser manejado por el llamador si es necesario
    }
  }

/*
//Recupero info de usuario
function getUserData(){
  let userData = JSON.parse(localStorage.getItem("discos"));
  return userData;
}
function setUserData(data){
  localStorage.setItem("discos",JSON.stringify(data))
  return true;
}
*/

//Convierte la duracion de los temas en formato mm:ss
  function formatMilliseconds(ms) {
    // Convertir milisegundos a segundos
    const totalSeconds = Math.floor(ms / 1000);
    
    // Obtener minutos y segundos
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Formatear minutos y segundos con dos dígitos
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    
    return `${minutesStr}:${secondsStr}`;
  }

  //Obtener fecha actual en formato dd/mm/yyyy
  function obtenerFechaFormateada() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`; 
}


function validForm(element, type){

  switch (type){
    case "username":
      if (element.value == ''){
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
      }else{
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true;
      }
    break;
    //email
    case "email":
      if(element.value.match(re)){
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true;
      }else{
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
      }
    break;
  }

}