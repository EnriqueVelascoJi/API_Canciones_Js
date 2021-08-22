import * as UI from './interfaz.js'

class API {
    constructor( artista, cancion ) {
        this.artista = artista;
        this.cancion = cancion;
        this.spinner = null;
    }
    crearSipinner() {
        this.spinner = document.createElement("div");
        this.spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
        `;
        this.spinner.classList.add("spinner");
        UI.divResultado.appendChild(this.spinner);

    }
    borrarSpinner() {
        this.spinner.remove(); 
    }

    consultarAPI() {

        //Crear el Spinner 
        this.crearSipinner();
        
        // console.log("Desde consultar api");
        const baseURL = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;
        const url = `https://api.allorigins.win/get?url=${ encodeURIComponent(baseURL)}`;

        fetch(url)
            .then( response => response.json())
            .then( resultado => {
                const {lyrics} = resultado;
                if(lyrics) {
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la canción: ${this.cancion} de ${this.artista}`;
                    this.borrarSpinner();
                       
                } else {
                    UI.divMensajes.textContent = "La canción no existe, pruebe con otra búsqueda";
                    UI.divMensajes.classList.add("error");
                    this.borrarSpinner();
                    setTimeout(() => {
                        UI.divMensajes.textContent = "";
                        UI.divMensajes.classList.remove("error");

                    }, 3000)
                }
               })
    }

}
export default API;