window.onload = function (e) {
    imprimirAsientos()
    let selectedDiv = null;

    document.querySelectorAll('.circle').forEach(function (div) {
        div.addEventListener('click', function () {
            if (selectedDiv) {
                selectedDiv.classList.remove('selected');
            }
            this.classList.add('selected');
            selectedDiv = this;
        });
    });
}

function imprimirAsientos() {
    const filaA = document.getElementById('fila-A')
    const filaB = document.getElementById('fila-B')
    const filaC = document.getElementById('fila-C')
    const filaD = document.getElementById('fila-D')
    try {
        let promise = fetch("https:localhost:7165/api/Sala")
        promise.then(response => response.json())
            .then(data => {
                console.log(data[0].asientos)
                data[0].asientos.forEach(as => {
                    let circulo = document.createElement('div')
                    circulo.setAttribute("id", `${as.id}`)
                    circulo.setAttribute("class", "circle")
                    circulo.innerText = as.numero
                    switch (as.fila) {
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
                        default:
                            console.log('No se encuentra la fila')
                    }
                    if (as.comprado === true) {
                        circulo.style.backgroundColor = "red"
                    }
                });
            })
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}