window.onload = function (e) {
    imprimirAsientos()

    var AsientosSeleccionas = null
    document.addEventListener("click", {

    })
}

function imprimirAsientos() {
    const filaA = document.getElementById('fila-A')
    const filaB = document.getElementById('fila-B')
    const filaC = document.getElementById('fila-C')
    const filaD = document.getElementById('fila-D')
    const filaE = document.getElementById('fila-E')
    const filaF = document.getElementById('fila-F')
    const filaG = document.getElementById('fila-G')
    const filaH = document.getElementById('fila-H')
    try {
        let promise = fetch("https://localhost:7165/api/Sesion")
        promise.then(response => response.json())
            .then(data => {
                console.log(data[0].asientos)
                data[0].asientos.forEach(asiento => {
                    let circulo = document.createElement('div')
                    circulo.setAttribute("id", `asiento_${asiento.id}`)
                    circulo.setAttribute("class", "circle")
                    circulo.innerText = asiento.numero
                    switch (asiento.fila) {
                        case 'A':
                            filaA.appendChild(circulo)
                            break;
                        case 'B':
                            filaB.appendChild(circulo)
                            break;
                        case 'C':
                            filaC.appendChild(circulo)
                            break;
                        case 'D':
                            filaD.appendChild(circulo)
                            break;
                        case 'E':
                            filaE.appendChild(circulo)
                            break;
                        case 'F':
                            filaF.appendChild(circulo)
                            break;
                        case 'G':
                            filaG.appendChild(circulo)
                            break;
                        case 'H':
                            filaH.appendChild(circulo)
                            break;
                        default:
                            console.log('No se encuentra la fila')
                    }
                    if (asiento.comprado === true) {
                        circulo.style.backgroundColor = "red"
                    }
                });
            })
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}