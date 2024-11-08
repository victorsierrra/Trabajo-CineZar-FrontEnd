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
}