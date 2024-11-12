
window.onload = function (e) {
    let filaA = document.getElementById('fila-A')
    let filaB = document.getElementById('fila-B')
    let filaC = document.getElementById('fila-C')
    let filaD = document.getElementById('fila-D')
    console.log(filaA)
    let promise = fetch("https://localhost:7165/api/Asiento")

    promise.then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(a => {
                let span = document.createElement('span')
                span.innerHTML = `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle id="${a.id}" r="4.5%" cx="50%" cy="50%" fill="red" />
        </svg>`
                switch(a.fila)
                {
                    case 'A':
                        filaA.appendChild(span)
                        break;
                    case 'B':
                        filaB.appendChild(span)
                        break;
                    case 'C':
                        filaC.appendChild(span)
                        break;
                    case 'D':
                        filaD.appendChild(span)
                        break;
                    default :
                        console.log('No se encuentra la fila')
                }
                let svg = document.getElementById(`${a.id}`)
                console.log(svg)
                if (a.comprado === true) {
                    svg.setAttribute("fill", "black")
                }
            });
        })
        .catch()
}
