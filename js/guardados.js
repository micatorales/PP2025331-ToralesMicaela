import Serie  from './serie.js';

const contenedor = document.getElementById("series");

const clavesLocal = Object.keys(localStorage);
const seriesGuardadas = [];

clavesLocal.forEach(clave => {
    try {
        const data = localStorage.getItem(clave);
        const serie = Serie.createFromJsonString(data);
        seriesGuardadas.push(serie);
    } catch (error) {
        console.error("Error al recuperar serie:", error);
    }
});

// Mostrar las series
seriesGuardadas.forEach(serie => {
    const div = serie.createHtmlElement();
    contenedor.appendChild(div);
});