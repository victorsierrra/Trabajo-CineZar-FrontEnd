let asientosSeleccionados = [];
const idSesion = localStorage.getItem('idSesion')
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
function verFecha(id) {
    let promise = fetch(`https://localhost:7165/api/Sesion/${id}`)
    promise.then(res => res.json())
        .then(data => {
            let fechaSesion = new Date(data.horaSesion)
            fechaSesion = fechaSesion.toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase()
            let divFecha = document.querySelector('.date-pelicula')
            divFecha.innerHTML = `<h3>${fechaSesion}</h3>`
        })
}
function imprimirAsientos() {
    const mapa = document.querySelector('.mapa-asientos');

    console.log(idSesion)
    try {
        let promise = fetch(`https://localhost:7165/api/Sesion/${idSesion}`)
        promise.then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.asientos)
                data.asientos.forEach(asiento => {
                    let circulo = document.createElement('div')
                    circulo.setAttribute("id", `asiento_${asiento.id}`)
                    circulo.setAttribute("class", "asiento")
                    circulo.setAttribute("onclick", `seleccionarAsiento('${circulo.id}')`);

                    circulo.innerText = asiento.numero
                    mapa.appendChild(circulo);
                    if (asiento.comprado === true) {
                        circulo.style.backgroundColor = "#1F293D"
                        circulo.style.cursor = "not-allowed"
                    }
                });
            })
    } catch (error) {
        console.error('Error al intentar el fetch', error);
    }
}
function seleccionarAsiento(id) {
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
    }
    asientoSeleccionado.classList.toggle('selected')
    asientosSeleccionados.forEach(id => verAsientosSeleccionados(id))

    console.log(`Clog -------------    ${variable}`)
    console.log(asientosSeleccionados)
}

function ComprarAsientos() {
    localStorage.setItem('idAsientos', asientosSeleccionados)
    let promise = fetch(`https://localhost:7165/api/Sesion/${idSesion}/ComprarEntrada`, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asientosSeleccionados)
    })
    promise.then(response => { response.json() })
        .then(data => {
            console.log('Success:', data);
            asientosSeleccionados = []
            window.location.reload()
        })
        .catch(error => {
            console.error('Problema con el fetch para la seleccion de entradas', error);
        });
}
function verAsientosSeleccionados(idAsiento) {
    let promise = fetch(`https://localhost:7165/api/Asiento/VerInfoAsiento/${idAsiento}`)
    promise.then(response => response.json())
        .then(data => {
            const asientosCards = document.getElementById('asientos-cards')
            const card = document.createElement("div");
            card.className = "asiento-card";
            card.id = `asiento_${data.id}`;
            card.textContent = `Fila ${data.fila}, número ${data.numero}`;
            card.setAttribute('onclick', `seleccionarSesion(${card.id})`)
            asientosCards.appendChild(card)
            console.log(data)
        })
        .catch(error => console.error("Problema con el fetch para ver los asientos seleccionados", error))

}