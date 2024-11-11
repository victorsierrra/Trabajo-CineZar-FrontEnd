window.onload = function (e) {
    console.log("Documento Cargado")
    let promise = fetch("https://localhost:7165/api/Pelicula")
    promise.then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(p => {
                let node = document.createElement('div')
                node.innerHTML = `<h2>${p.titulo}</h1>
                <p>${p.sinopsis} <br>
                ${p.director}</p>
                <img src="${p.portada}">
                `
                document.getElementById('resultado').appendChild(node)
            });
        })
        .catch()

    let fetchAsiento = fetch("https://localhost:7165/api/Asiento")
    fetchAsiento.then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(a => {
                let node = document.createElement('div')
                node.innerHTML = `<svg  height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                        <circle id="${a.id}"  r="45" cx="50" cy="50" fill="red" />
                    </svg>`
                document.getElementById('resultado').appendChild(node)
                let svg = document.getElementById(`${a.id}`)
                console.log(svg)
                if (a.comprado === true)
                {
                    svg.setAttribute("fill", "black")
                }
            });
        })
        .catch()
}

function putAsiento() {
    let fetchAsientoPut = fetch(`https://localhost:7165/api/Asiento/4?pComprado=true`,
        { method: 'PUT' }
    )
    fetchAsientoPut.then(res => console.log(res))
}