const apiMenu = async(idBoton)=>{

    const resp =await fetch("MENU.json");
    const {Menu} = await resp.json();
    const SubMenu = Menu[`${idBoton}`];

    MaquetarCuerpo(SubMenu);
}


document.addEventListener('DOMContentLoaded',()=>{
    
    let botones = document.querySelectorAll('.Menu__opcion');
    let Btn_Compra = document.getElementById('Compra');
    
    botones.forEach(boton => {
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

    Btn_Compra.addEventListener('click',()=>{
        let modal_compra = document.getElementById('modal-compra');
        abrirModal(modal_compra);

        let finProductos = FiltroSearch(arrayCompra);
        finProductos;
        MaquetarCompra();

        document.addEventListener('click', function(event) {
            if (event.target === modal_compra) {
                cerrarModal(modal_compra);
            }
        });



    })

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
        const {name, description, price,filterId} = element;
        maqueta += `<div class="card">
            <img src="https://via.placeholder.com/600/92c952" alt="" class="card__img">
            <span class="card__nombre">${name}</span>
            <p class="card__descripcion">${description}</p>
            <span class="card__precio precio">$${price}</span>
            <button class="card__compra btn" data-price=${price} data-nombre="${name}" data-id=${filterId}>AGREGAR</button>
        </div>`;
    });

    document.getElementById('modal__info').innerHTML = maqueta;

    let botonesAgregarCarro = document.querySelectorAll('.btn');

    botonesAgregarCarro.forEach(boton => {
        boton.addEventListener('click', () => {
            const price = parseFloat(boton.getAttribute('data-price'));
            const name = boton.getAttribute('data-nombre');
            const id = boton.getAttribute('data-id');
            arrayCompra.push({name, price,id}); // Almacena un objeto con el nombre y el precio
            console.log(arrayCompra);
            Suma(arrayCompra);
        });
    });
}

function Suma(arrayCompra) {
    let total = arrayCompra.reduce((acc, item) => acc + item.price, 0);
    console.log("Total:", total);
    MostrarDetallesVenta(arrayCompra, total);
}

function MostrarDetallesVenta(arrayCompra, total) {
    console.log("Detalles de la venta:");
    arrayCompra.forEach(item => {
        console.log("Producto:", item.name, "- Precio:", item.price);
    });
    console.log("Total de la venta:", total);
}

const FiltroSearch = async (arrayCompra) => {
    console.log(arrayCompra);
    let arrayComida = [];
    arrayCompra.forEach(element => {
        arrayComida.push(element.id);
    });
    const resp = await fetch("MENU.json");
    const { Menu } = await resp.json();
    console.log(Menu);
    const cemitas = Menu.Cemitas;
    const caldos = Menu.Caldos;
    const antojitos = Menu.Antojitos;
    let FinCompra = [];
    arrayComida.forEach(element2 => {
        console.log(element2);
        const FiltroCemita = cemitas.filter((element) => element.filterId == element2); // Ejemplo de filtrado por nombre
        const FiltroCaldo = caldos.filter((element) => element.filterId == element2); // Ejemplo de filtrado por nombre
        const FiltroAntojitos = antojitos.filter((element) => element.filterId == element2); // Ejemplo de filtrado por nombre
        
        // Agregar elementos filtrados al array FinCompra
        FinCompra = FinCompra.concat(FiltroCemita, FiltroCaldo, FiltroAntojitos);
    });

    console.log(FinCompra);
}

function MaquetarCompra() {
    let maquetaCompra = '';
    maquetaCompra += `<div>Hola mundo<div>`;
    document.getElementById('modal__compra').innerHTML = maquetaCompra;
}