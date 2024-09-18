//crea usuario ficticio
async function crearUsuario(){
  localStorage.removeItem("discos");
  await fetch('./data/fakeUser.json')
    .then((response) => response.json())
    .then((json) => 
      localStorage.setItem("discos",JSON.stringify(json))
    );

}

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

//Recupero info de usuario
function getUserData(){
  let userData = JSON.parse(localStorage.getItem("discos"));
  return userData[0];
}


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