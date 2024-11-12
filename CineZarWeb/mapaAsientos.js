
window.onload = function (e) {
    fetchAsientosSalaAsync()

}

async function fetchAsientosSalaAsync() {
    const filaA = document.getElementById('fila-A')
    const filaB = document.getElementById('fila-B')
    const filaC = document.getElementById('fila-C')
    const filaD = document.getElementById('fila-D')
    try {
        const response = await fetch('https://localhost:7165/api/Sala');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('sin cargar')

        console.log(data[0].asientos)
        data[0].asientos.forEach(a => {
            let span = document.createElement('span')
            span.innerHTML = `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <circle id="${a.id}" r="4.5%" cx="50%" cy="50%" fill="red" />
    </svg>`
            switch (a.fila) {
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
                default:
                    console.log('No se encuentra la fila')
            }
            let svg = document.getElementById(`${a.id}`)
            if (a.comprado === true) {
                svg.setAttribute("fill", "black")
            }
        })
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
    console.log('cargado')
    let arrayAsientosCirculo = document.querySelectorAll('circle')
    console.log(arrayAsientosCirculo)
}