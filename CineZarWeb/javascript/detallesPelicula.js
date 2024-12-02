document.addEventListener("DOMContentLoaded", function () {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    console.log(movie)

    if (movie) {
        document.getElementById('movie-title').innerText = movie.titulo;
        document.getElementById('movie-details__poster').src = movie.portada;
        document.getElementById('movie-description').innerText = movie.sinopsis;
        document.getElementById('movie-duration').innerText = movie.duracion;
        document.getElementById('movie-release').innerText = movie.estreno;
        document.getElementById('movie-genre').innerText = movie.genero;
        document.getElementById('movie-director').innerText = movie.director;
    }

});
function irASesiones() {
    const peliculaSeleccionada = document.getElementById('movie-title').textContent;
    window.location.href = 'sesiones.html';
}
