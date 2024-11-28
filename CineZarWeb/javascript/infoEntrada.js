const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const sesion = JSON.parse(localStorage.getItem('sesionSeleccionada'))
const asientosComprados = JSON.parse(localStorage.getItem('asientosComprados'))
let entradas = []
// console.log(sesion.entradas[0])
asientosComprados.forEach(element => {
    let entradaAsientoComprado = sesion.entradas.find(function (item) { return item.asiento.id === element.id })
    entradas.push(entradaAsientoComprado)
});

console.log(sesion)
// console.log(entradas)
// console.log(asientosComprados)
// console.log(sesion)

console.log(movie.titulo)

window.onload = function () {
    const divPelicula = document.querySelector('.info-pelicula')
    let fechaSesion = new Date(sesion.horaSesion).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase()
    divPelicula.innerHTML = `
<h2 class = "info-pelicula__title">${movie.titulo}</h2>
<h3 class = "info-pelicula__sesion">${fechaSesion}    -   Sala ${sesion.numeroSala}</h3>
<img class ="info-entradas__image-pelicula" src="${movie.portada}">
`

recogidaInfoEntradas()
cargarPrecioTotal()
}
// var divAsiento = null;

function recogidaInfoEntradas(){entradas.forEach(entrada => {
    let divAsiento = document.querySelector('.info-asientos')
    let divInfoAsiento = document.createElement('div')
    divInfoAsiento.innerHTML = `
    <p>Fila: ${entrada.asiento.fila}  -  Numero: ${entrada.asiento.numero}  -  Precio: ${entrada.precio.toFixed(2)}€</p>
    `
    console.log(divInfoAsiento)
    divAsiento.appendChild(divInfoAsiento)
})}
function cargarPrecioTotal() {
    let prueba = 0;

    prueba = entradas.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )
}
