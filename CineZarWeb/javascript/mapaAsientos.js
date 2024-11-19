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
function verFecha(id)
{
    let promise = fetch(`https://localhost:7165/api/Sesion/${id}`)
    promise.then(res => res.json())
    .then(data =>{
        let fechaSesion = new Date(data.horaSesion)
        fechaSesion = fechaSesion.toLocaleString('es-ES', {weekday: 'long', day: 'numeric', month: 'short' ,hour: 'numeric', minute: '2-digit'}).toUpperCase()
        let divFecha = document.querySelector('.date-pelicula')
        divFecha.innerHTML = `<h3>${fechaSesion}</h3>`
    })
}
function imprimirAsientos() {
    const filaA = document.getElementById('fila-A');
    const filaB = document.getElementById('fila-B');
    const filaC = document.getElementById('fila-C');
    const filaD = document.getElementById('fila-D');
    const filaE = document.getElementById('fila-E');
    const filaF = document.getElementById('fila-F');
    const filaG = document.getElementById('fila-G');
    const filaH = document.getElementById('fila-H');
    const filaI = document.getElementById('fila-I');
    const filaJ = document.getElementById('fila-J');
    const filaK = document.getElementById('fila-K');
    const filaL = document.getElementById('fila-L');
    const filaM = document.getElementById('fila-M');
    const filaN = document.getElementById('fila-N');
    const filaO = document.getElementById('fila-O');
    const filaP = document.getElementById('fila-P');
    const filaQ = document.getElementById('fila-Q');
    const filaR = document.getElementById('fila-R');
    const filaS = document.getElementById('fila-S');
    const filaT = document.getElementById('fila-T');
    const filaU = document.getElementById('fila-U');
    const filaV = document.getElementById('fila-V');
    const filaW = document.getElementById('fila-W');
    const filaX = document.getElementById('fila-X');
    const filaY = document.getElementById('fila-Y');
    const filaZ = document.getElementById('fila-Z');

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
                    switch (asiento.fila) {
                        case 'A':
                            filaA.appendChild(circulo);
                            break;
                        case 'B':
                            filaB.appendChild(circulo);
                            break;
                        case 'C':
                            filaC.appendChild(circulo);
                            break;
                        case 'D':
                            filaD.appendChild(circulo);
                            break;
                        case 'E':
                            filaE.appendChild(circulo);
                            break;
                        case 'F':
                            filaF.appendChild(circulo);
                            break;
                        case 'G':
                            filaG.appendChild(circulo);
                            break;
                        case 'H':
                            filaH.appendChild(circulo);
                            break;
                        case 'I':
                            filaI.appendChild(circulo);
                            break;
                        case 'J':
                            filaJ.appendChild(circulo);
                            break;
                        case 'K':
                            filaK.appendChild(circulo);
                            break;
                        case 'L':
                            filaL.appendChild(circulo);
                            break;
                        case 'M':
                            filaM.appendChild(circulo);
                            break;
                        case 'N':
                            filaN.appendChild(circulo);
                            break;
                        case 'O':
                            filaO.appendChild(circulo);
                            break;
                        case 'P':
                            filaP.appendChild(circulo);
                            break;
                        case 'Q':
                            filaQ.appendChild(circulo);
                            break;
                        case 'R':
                            filaR.appendChild(circulo);
                            break;
                        case 'S':
                            filaS.appendChild(circulo);
                            break;
                        case 'T':
                            filaT.appendChild(circulo);
                            break;
                        case 'U':
                            filaU.appendChild(circulo);
                            break;
                        case 'V':
                            filaV.appendChild(circulo);
                            break;
                        case 'W':
                            filaW.appendChild(circulo);
                            break;
                        case 'X':
                            filaX.appendChild(circulo);
                            break;
                        case 'Y':
                            filaY.appendChild(circulo);
                            break;
                        case 'Z':
                            filaZ.appendChild(circulo);
                            break;
                        default:
                            console.log('No se encuentra la fila');
                    }
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

    console.log(`Clog -------------    ${variable}`)
    console.log(asientosSeleccionados)
}

function ComprarAsientos() {
    let promise = fetch(`https://localhost:7165/api/Sesion/ComprarEntrada/${idSesion}`, {
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