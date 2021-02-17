// Variables
const carrito = document.querySelector("#carrito"),
  contenedorCarrito = document.querySelector("#lista-carrito tbody"), // Genara cdodigo html o elimina (tabla de submenu)
  vaciarCarritoBtn = document.querySelector("#vaciar-carrito"),
  listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// Carga de todos los even listeners
cargarEventListener();
function cargarEventListener() {
  // Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () =>{
    articulosCarrito = []; // Recetea carrito de compras

    limpiarHTML(); // Eliminamos todo el HTML
  })
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id');

      // Elimina del arreglo de articulosCarrito por el data-id
      articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

     carritoHTML(); // Iterar sobre el carrito y mostrar su HTML 
    }
}

// Lee el contenido del HTMl al que le dimos click y extrae la info del curso
function leerDatosCurso(curso) {
  // Crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  };

  // Revisar si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
  if(existe){
      //Actualizamos cantidad
      const cursos = articulosCarrito.map( curso =>{
          if(curso.id === infoCurso.id ){
              curso.cantidad++;
              return curso; // Retorna el objeto actualizado
          }else {
              return curso; // Retorna los objetos que nos son duplicados
          }
      } );
      articulosCarrito = [...cursos];
  }else{
      // Agregamos el curso al carrito 
      // Arreglo del carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
      console.log(articulosCarrito);
  }


  carritoHTML();

}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

  articulosCarrito.forEach( curso => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
            <img src='${imagen}' width="100">
            </td>
            <td> ${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;
    // Agregando HTML del carrito
    contenedorCarrito.appendChild(row);
  });


}

// Eliminar los cursos de tbody
function limpiarHTML() {
    // Forma lenta
    /* contenedorCarrito.innerHTML = ''; */
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
