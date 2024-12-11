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
    let promise = fetch(`https://localhost:7165/api/Pelicula/${movie.id}`)
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
                divOpinion.innerText = `El usuario: ${opinion.usuario}\n Numero de Valoracion: ${opinion.valoracion} Comentario: ${opinion.comentario} \nFecha de ${fecha}`
                document.getElementById('opiniones').appendChild(divOpinion)
            });

        })
}
function enviarOpinion(){
    let usuario = document.getElementById('form-usuario')
    let valoracion = document.getElementById('form-valo')
    let comentario = document.getElementById('form-comentario')
    console.log(`------------------- ${valoracion}`)
    if(valoracion.value < 1 || valoracion.value > 5){
        alert('Error, la valoracion tiene que ser entre 1 y 5')
    }else{
    fetch(`https://localhost:7165/api/Pelicula/${movie.id}/CrearOpinion?iValoracion=${valoracion.value}&strComentario=${comentario.value}&strUsuario=${usuario.value}`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'text/plain'
        }
    })
    promise.then(response => { response.json() })
        .then(data => {
            window.onload()
        })
        .catch(error => {
            console.error(error);
        });
    }
}