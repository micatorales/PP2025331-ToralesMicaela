import Serie from "./Serie.js";

class Modelo {
    Series;
    constructor(){
        this.Series=[];
    }
}
class Control {
    constructor(vista,modelo){
        this.Vista = vista;
        this.Modelo = modelo;
        this.seriesPorPagina = 6; //creo constante p
        this.paginaActual = 1;
        this.URL = 'https://api.tvmaze.com/shows/';
        this.registrarBotones();
        this.CargaInicial();
        this.Vista.Control = this;
    }
    CargaInicial(){
        const inicio = (this.paginaActual - 1) * this.seriesPorPagina + 1;
        const fin = inicio + this.seriesPorPagina;
        const series = [];
        let contador = inicio;

        const cargarUnaSerie = () => {
            if (contador < fin) {
                fetch(this.URL + contador)
                    .then(res => {
                        if (!res.ok) throw new Error("Respuesta no OK");
                        return res.json();
                    })
                    .then(data => {
                        console.log("SERIEEEE:", data.name); // Verificá que llega
                        const nuevaSerie = new Serie(
                            data.id,
                            data.officialSite || data.url,
                            data.name,
                            data.language,
                            data.genres,
                            data.image?.medium || "https://via.placeholder.com/210x295?text=Sin+Imagen"
                        );
                        series.push(nuevaSerie);
                        console.log("SERIES "+series)
                        contador++;
                        cargarUnaSerie();
                    })
                    .catch(err => {
                        console.error("Error al cargar serie:", err);
                        contador++;
                        cargarUnaSerie();
                        });
            } else {
                this.Vista.mostrarSeries(series);
            }
        };
        cargarUnaSerie();
    }
    registrarBotones(){
        this.Vista.botones.btnSiguiente.addEventListener("click", (e) =>{
            this.paginaActual++; 
            this.CargaInicial();
        })
        this.Vista.botones.btnAnterior.addEventListener("click", () => {
            if (this.paginaActual > 1) {
                this.paginaActual--;
                this.CargaInicial();
            }
        });

    }
}

class Vista{
    panelIzquierda;
    loPrincipal;
    botones;
    constructor(){
        this.panelIzquierda = {
            panelIzq : this.$("panel-izquierda"),
            link1 : this.$("link_1"),
            link2 : this.$("link_2"),
        },
        this.loPrincipal ={
            principal : this.$("principal"),
            series :this.$("series"),
        },
        this.botones={
            btnAnterior: this.$("anterior"),
            btnSiguiente:this.$("siguiente"),
        }

    }
    $(id){
        return document.getElementById(id);
    }
    mostrarSeries(arraySeries){
        const contenedor = this.loPrincipal.series;
        console.log(contenedor);
        contenedor.innerHTML="";
        arraySeries.forEach(serie => {
            const div = serie.createHtmlElement();
            contenedor.appendChild(div);
        });
    }
}
let vista = new Vista();
let modelo = new Modelo();
let control = new Control(vista, modelo);
