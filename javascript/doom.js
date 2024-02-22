
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

function MaquetarCuerpo(SubMenu) {
    let maqueta = '';

    SubMenu.forEach(element => {
        console.log(element);
    });
}