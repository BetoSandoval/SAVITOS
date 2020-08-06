let ubicacionPrincipal = window.pageYOffset;

window.addEventListener('scroll', function(){
    let desplazamientoActual = window.pageYOffset;
    if(ubicacionPrincipal >= desplazamientoActual){
        document.getElementsByTagName('nav')[0].style.top = "0px"
    }else{
        document.getElementsByTagName('nav')[0].style.top = "-100px"
    }
    ubicacionPrincipal = desplazamientoActual;
});

// Menu interactivo desplegable
let boton = document.getElementById('icono');
let enlaces = document.getElementById('enlaces');
const hamburger = document.getElementById('hamburger');
let contador = 0;

boton.addEventListener('click', function(){
    if(contador == 0){
        enlaces.className = ('enlaces dos');
        contador=1;
    }else{
         enlaces.classList.remove('dos');
         enlaces.className = ('enlaces uno');
         contador = 0;
    }
})

window.addEventListener('click', e=>{
    if(enlaces.classList.contains('dos') && e.target != boton && e.target != hamburger){
        enlaces.classList.toggle('dos');
        enlaces.className = ('enlaces uno');
        contador=0;
    }
})
// Slider 
let slider = document.querySelector('.slider-contenedor');
let sliderIndividual = document.querySelectorAll('.contenido-slider');
let cuenta = 1;
let width = sliderIndividual[0].clientWidth;
let intervalo = 7800;

window.addEventListener('resize', function(){
    width = sliderIndividual[0].clientWidth;
})

setInterval(function(){
    slides();
}, intervalo);

function slides(){
    slider.style.transform = "translate("+(-width*cuenta)+"px)";
    slider.style.transition = 'transform 3s';
    cuenta++;

    if(cuenta == sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform = 'translate(0px)';
            slider.style.transition = 'transform 0s';
            cuenta=1;
        }, 2800);
    }
};
