export default class Serie{
    constructor(id,url,name,language,generes,image){
        this.id = id,
        this.url = url,
        this.name = name;
        this.language = language; 
        this.generes = generes; 
        this.image = image;  
    }
    guardarSerie() {
        const clave = `serie${this.id}`; //aca traigo el id de mi serie
        localStorage.setItem(clave, this.toJsonString());  //local storage solo recive strings
        alert(`Serie "${this.name}" GUARDADOO`); 
    }
    toJsonString() {
        return JSON.stringify({
        id: this.id,
        url: this.url,
        name: this.name,
        language: this.language,
        generes: this.generes,
        image: this.image
        });
    }
    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(
        data.id,
        data.url,
        data.name,
        data.language,
        data.generes,
        data.image
        );
    }
    createHtmlElement() {
        const contenedor = document.createElement('div');
        contenedor.classList.add("tarjeta");
        contenedor.className = 'serie';
    
        const title = document.createElement('h2');
        title.textContent = this.name;
    
        const language = document.createElement('p');
        language.textContent = `Idioma: ${this.language}`;
    
        const generes = document.createElement('p');
        generes.textContent = `Géneros: ${this.generes.join(', ')}`;
    
        const img = document.createElement('img');
        img.src = this.image;
        img.alt = `${this.name} imagen`;

        const btnGuardar = document.createElement('button');
        btnGuardar.classList.add("boton")

        btnGuardar.textContent = "guardar";
        btnGuardar.addEventListener('click', () => {
            this.guardarSerie();
        });
        img.addEventListener('click', () => {
            window.open(this.url, '_blank');
        });

        contenedor.appendChild(title);
        contenedor.appendChild(language);
        contenedor.appendChild(generes);
        contenedor.appendChild(img);
        contenedor.appendChild(btnGuardar);
    
        return contenedor;
    }
}