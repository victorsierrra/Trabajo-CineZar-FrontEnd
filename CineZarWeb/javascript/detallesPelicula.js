const movie = JSON.parse(localStorage.getItem('selectedMovie'));
document.addEventListener("DOMContentLoaded", function () {

    console.log(movie.id)
    cargarPelicula()
    /*
        if (movie) {
            document.getElementById('movie-title').innerText = movie.titulo;
            document.getElementById('movie-details__poster').src = movie.portada;
            document.getElementById('movie-description').innerText = movie.sinopsis;
            document.getElementById('movie-duration').innerText = movie.duracion;
            document.getElementById('movie-release').innerText = movie.estreno;
            document.getElementById('movie-genre').innerText = movie.genero;
            document.getElementById('movie-director').innerText = movie.director;
        }*/

});
function irASesiones() {
    const peliculaSeleccionada = document.getElementById('movie-title').textContent;
    window.location.href = 'sesiones.html';
}
function cargarPelicula() {
    let promise = fetch(`http://localhost:27301/api/Pelicula/${movie.id}`)
    promise.then(res => res.json())
        .then(movieFetch => {
            console.log(movieFetch)
            document.getElementById('movie-title').innerText = movieFetch.titulo;
            document.getElementById('movie-details__poster').src = movieFetch.portada;
            document.getElementById('movie-description').innerText = movieFetch.sinopsis;
            document.getElementById('movie-duration').innerText = movieFetch.duracion;
            document.getElementById('movie-release').innerText = movieFetch.estreno;
            document.getElementById('movie-genre').innerText = movieFetch.genero;
            document.getElementById('movie-director').innerText = movieFetch.director;
            document.getElementById('movie-media').innerText = movieFetch.opinionMedia;
            movieFetch.opiniones.forEach(opinion => {
                let divOpinion = document.createElement('div')
                let fecha = new Date(opinion.fechaCreacion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
                divOpinion.innerHTML = `<p>El usuario: ${opinion.usuario}<br> Numero de Valoracion: ${opinion.valoracion} <br>Comentario: ${opinion.comentario} <br>Fecha de ${fecha}</p>
                <button id="borrar-Opinion" style="margin: 30px;" onclick="borrarOpinion(${opinion.id})">Borrar Comentario</button>`
                document.getElementById('opiniones').appendChild(divOpinion)
            });

        })
}
function enviarOpinion(){
    let texto = "faadad"
    let usuario = document.getElementById('form-usuario')
    let valoracion = document.getElementById('form-valo')
    let comentario = document.getElementById('form-comentario')
    console.log(`------------------- ${valoracion}`)
    if(valoracion.value < 1 || valoracion.value > 5){
        alert('La valoracion tiene que ser del 1 al 5')
    }else if (comentario.value.trim() === "" || usuario.value.trim() === ""){
        alert('Todos los campos tienen que estar rellenos')
    }
    else{
    fetch(`http://localhost:27301/api/Pelicula/${movie.id}/CrearOpinion?iValoracion=${valoracion.value}&strComentario=${comentario.value}&strUsuario=${usuario.value}`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'text/plain'
        }
    })
    .then(response => { response.json() })
        .then(data => {
            window.onload()
        })
        .catch(error => {
            console.error(error);
        });
    }
}
function borrarOpinion(id){
    fetch(`http://localhost:27301/api/Pelicula/${movie.id}/BorrarOpinion?idOpinion=${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'text/plain'
        }
    })
    .then(response => { response.json() })
        .then(data => {
            window.location.href = 'detallesPelicula.html';
        })
        .catch(error => {
            console.error(error);
        });
}