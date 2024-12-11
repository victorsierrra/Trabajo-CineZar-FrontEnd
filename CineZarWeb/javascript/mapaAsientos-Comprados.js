let asientosSeleccionados = [];
const idSesion = localStorage.getItem('idSesion')
let dataAsientos = []
let arrayAsientosComprados = []
window.onload = function (e) {
    imprimirAsientos()
    const pelicula = JSON.parse(localStorage.getItem('selectedMovie'))
    let divTitulo = document.querySelector('.title-pelicula')
    console.log(pelicula.titulo)
    divTitulo.innerHTML = `<h2>${pelicula.titulo.toUpperCase()}</h2>`
    verFecha(idSesion)


    var AsientosSeleccionas = null
    document.addEventListener("click", {

    })
}
function imprimirAsientos() {
    const mapa = document.querySelector('.mapa-asientos__asientos');
    if (asientosSeleccionados.length < 1) {
        let asientosSeleccionadosDiv = document.getElementById('asientos-cards')
        asientosSeleccionadosDiv.style.display = 'none'
    }

    console.log(idSesion)
    try {
        let promise = fetch(`http://localhost:27301/api/Sesion/${idSesion}`)
        promise.then(response => response.json())
            .then(data => {
                localStorage.setItem('sesionSeleccionada', JSON.stringify(data));
                console.log(data)
                let fechaSesion = new Date(data.horaSesion)
                fechaSesion = fechaSesion.toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase()
                let divFecha = document.querySelector('.date-pelicula')
                divFecha.innerHTML = `<h3>${fechaSesion}</h3>`
                console.log(data)
                console.log(data.asientos)
                dataAsientos = data.asientos
                data.asientos.forEach(asiento => {
                    let circulo = document.createElement('div')
                    circulo.setAttribute("id", `asiento_${asiento.id}`)
                    circulo.setAttribute("class", "asiento")
                    circulo.setAttribute("onclick", `seleccionarAsiento('${circulo.id}')`);

                    circulo.innerText = asiento.numero
                    mapa.appendChild(circulo);
                    if (asiento.comprado === false) {
                        circulo.style.backgroundColor = "#1F293D"
                        circulo.style.cursor = "not-allowed"
                        circulo.style.color = "#FFFFFF"
                        circulo.style.pointerEvents = "none"

                    }
                });
            })
    } catch (error) {
        console.error('Error al intentar el fetch', error);
    }
}
function seleccionarAsiento(id) {
    arrayAsientosComprados = []
        let asientosSeleccionadosDiv = document.getElementById('asientos-cards')
        asientosSeleccionadosDiv.style.display = 'grid'
    const asientosCards = document.getElementById('asientos-cards')
    asientosCards.innerHTML = ""
    let asientoSeleccionado = document.getElementById(id)
    let variable = id.substring(8)
    if (asientosSeleccionados.includes(variable)) {
        console.log('Dejar de seleccionar')
        asientosSeleccionados = asientosSeleccionados.filter(asiento => asiento != variable)
    }
    else {
        asientosSeleccionados.push(variable)
        if (asientosSeleccionados.length > 5) {
            const asientoADeseleccionar = document.getElementById(`asiento_${asientosSeleccionados[0]}`)
            asientoADeseleccionar.classList.toggle('selected')
            asientosSeleccionados.shift()
        }
    }
    asientoSeleccionado.classList.toggle('selected')
    asientosSeleccionados.forEach(id => verAsientosSeleccionados(id))

    console.log(`Clog -------------    ${variable}`)
    console.log(asientosSeleccionados)
}

function DevolverAsientos() {
    localStorage.setItem('idAsientos', asientosSeleccionados)
    if(asientosSeleccionados.length > 0){
    let promise = fetch(`http://localhost:27301/api/Sesion/${idSesion}/DevolverEntrada`, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asientosSeleccionados)
    })
    promise.then(response => { response.json() })
        .then(data => {
            localStorage.setItem('asientosComprados', JSON.stringify(arrayAsientosComprados))
            console.log('Success:', data);
            asientosSeleccionados = []
            window.location.href = "../html/mapaAsientos.html"
        })
        .catch(error => {
            console.error('Problema con el fetch para la seleccion de entradas', error);
        });
    }
    else{
        alert('No hay asientos seleccionados')
    }
}
function verAsientosSeleccionados(idAsiento) {
    const asientoSeleccionado = dataAsientos.find(function (asiento) { return asiento.id == idAsiento; });
    arrayAsientosComprados.push(asientoSeleccionado)
    console.log(asientoSeleccionado)
    const asientosCards = document.getElementById('asientos-cards')
    const card = document.createElement("div");
    card.className = "asiento-card";
    card.id = `asiento_${asientoSeleccionado.id}`;
    card.textContent = `Fila ${asientoSeleccionado.fila}, número ${asientoSeleccionado.numero}`;
    card.setAttribute('onclick', `seleccionarSesion(${card.id})`)
    asientosCards.appendChild(card)
}