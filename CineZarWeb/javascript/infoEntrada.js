const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const sesion = JSON.parse(localStorage.getItem('sesionSeleccionada'))
const asientosComprados = JSON.parse(localStorage.getItem('asientosComprados'))
let entradas = []


fetch(`https://localhost:7165/api/Sesion/${sesion.id}`)
.then (res => res.json())
.then(data => {
    asientosComprados.forEach( element => {
        let entradaAsientoComprado = data.entradas.find(function(item) {
            return item.asiento.id === element.id
        })
        entradas.push(entradaAsientoComprado)
    })
})
.catch(error=> alert(error))


window.onload = function () {
    const divPelicula = document.querySelector('.info-pelicula')
    let fechaSesion = new Date(sesion.horaSesion).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase()
    divPelicula.innerHTML = `
<h2 class = "info-pelicula__title">${movie.titulo}</h2>
<h3 class = "info-pelicula__sesion">${fechaSesion}    -   Sala ${sesion.numeroSala}</h3>
<img class ="info-entradas__image-pelicula" src="${movie.portada}">
`
document.querySelector('.info-coste').innerHTML= cargarPrecioTotal()    
recogidaInfoEntradas()
}


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
    let precioTotal = 0;

    entradas.forEach(entrada =>
       precioTotal += entrada.precio
    )

    return precioTotal
}
