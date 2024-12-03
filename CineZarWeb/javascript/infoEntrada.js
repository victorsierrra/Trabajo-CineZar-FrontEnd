const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const sesion = JSON.parse(localStorage.getItem('sesionSeleccionada'))
const asientosComprados = JSON.parse(localStorage.getItem('asientosComprados'))
let entradas = []


fetch(`https://localhost:7165/api/Sesion/${sesion.id}`)
    .then(res => res.json())
    .then(data => {
        asientosComprados.forEach(element => {
            let entradaAsientoComprado = data.entradas.find(function (item) {
                return item.asiento.id === element.id
            })
            entradas.push(entradaAsientoComprado)
        })
    })
    .catch(error => alert(error))


window.onload = function () {
    recogidaInfoEntradas()
    cargarPrecioTotal()
    const divPelicula = document.querySelector('.info-pelicula')
    let fechaSesion = new Date(sesion.horaSesion).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase()
    divPelicula.innerHTML = `
<h2 class = "info-pelicula__title">${movie.titulo}</h2>
<h3 class = "info-pelicula__sesion">${fechaSesion}    -   Sala ${sesion.numeroSala}</h3>
<div class ="info-entradas__image-pelicula"></div>
`
    document.querySelector(".info-entradas__image-pelicula").style.backgroundImage = `url(${movie.portada})`

}
function recogidaInfoEntradas() {
    let divTablas = document.createElement('div')
    divTablas.className = 'info-entradas__tablas'
    entradas.forEach(entrada => {
        let tablaEntradas = document.createElement('table')
        tablaEntradas.className = "info-entradas__entradas-table"
        tablaEntradas.innerHTML = `                <tr class="info-entradas__entradas-table__info">
                    <td class="info-entradas__entradas-table__ref"><b>Cod Entrada</b></td>
                    <td class="info-entradas__entradas-table__dato">${entrada.id}</td>
                </tr>
                <tr class="info-entradas__entradas-table__info">
                    <td class="info-entradas__entradas-table__ref"><b>Fila del Asiento</b></td>
                    <td class="info-entradas__entradas-table__dato">${entrada.asiento.fila}</td>
                </tr>
                <tr class="info-entradas__entradas-table__info">
                    <td class="info-entradas__entradas-table__ref"><b>Numero de Asiento</b></td>
                    <td class="info-entradas__entradas-table__dato">${entrada.asiento.numero}</td>
                </tr>
                <tr class="info-entradas__entradas-table__info" style="border: none;">
                    <td class="info-entradas__entradas-table__ref"><b>Precio de la entrada</b></td>
                    <td class="info-entradas__entradas-table__dato">${entrada.precio.toFixed(2)} €</td>
                </tr>`
                divTablas.appendChild(tablaEntradas)
        document.querySelector('.info-entradas__entradas').appendChild(divTablas)
    })
}

function cargarPrecioTotal() {
    let precioTotal = 0;

    entradas.forEach(entrada =>
        precioTotal += entrada.precio
    )

    precioTotal = precioTotal.toFixed(2) + "€"

    let divCosteTotal = document.createElement('div')
    divCosteTotal.className = "info-entradas__entradas-total"
    divCosteTotal.innerText = `TOTAL:  ${precioTotal}`
    document.querySelector('.info-entradas__entradas').appendChild(divCosteTotal)

}