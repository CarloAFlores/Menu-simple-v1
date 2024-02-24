const apiMenu = async(idBoton)=>{

    const resp =await fetch("MENU.json");
    const {Menu} = await resp.json();
    const SubMenu = Menu[`${idBoton}`];

    MaquetarCuerpo(SubMenu);
}


document.addEventListener('DOMContentLoaded',()=>{
    
    let botones = document.querySelectorAll('.Menu__opcion');
    
    botones.forEach(boton => {
        let modal = document.getElementById('modal');
        boton.addEventListener('click', () => {
            let Id = boton.id
            BuscadorAPI(Id);

            let modal = document.getElementById('modal');
            abrirModal(modal);
        });

    });

    document.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal(modal);
        }
    });

})

function abrirModal(modal){
    modal.style.animation = "1s fadeIn";
    modal.style.setProperty('animation-fill-mode', 'forwards');
}

function cerrarModal(modal){
    modal.style.animation = "1s fadeOff";
    modal.style.setProperty('animation-fill-mode', 'forwards');
}

function BuscadorAPI(idBoton){
    console.log(idBoton)
    apiMenu(idBoton);
}
let arrayCompra = [];

function MaquetarCuerpo(SubMenu) {
    let maqueta = '';

    SubMenu.forEach(element => {
        const {name, description, price} = element;
        maqueta += `<div class="card">
            <img src="https://via.placeholder.com/600/92c952" alt="" class="card__img">
            <span class="card__nombre">${name}</span>
            <p class="card__descripcion">${description}</p>
            <span class="card__precio precio">$${price}</span>
            <button class="card__compra btn" data-price=${price}>AGREGAR</button>
        </div>`;
    });

    document.getElementById('modal__info').innerHTML = maqueta;

    let botonesAgregarCarro = document.querySelectorAll('.btn');

    botonesAgregarCarro.forEach(boton => {
        boton.addEventListener('click', () => {
            const price = boton.getAttribute('data-price');
            arrayCompra.push(price)
            console.log(price);
            Suma(arrayCompra);
        });
    });
}

function Suma(arrayCompra) {
    console.log(arrayCompra);
    // Convertir cada elemento del array a número usando parseFloat
    let total = arrayCompra.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    console.log(total);
    localStorage.setItem("titulo",total);
}