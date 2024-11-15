let currentIndex = 0;

window.onload = function () {
    console.log("Documento Cargado");

    // Fetch de las películas
    fetch("https://localhost:7165/api/Pelicula")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Dividir películas entre el carrusel y la lista
            const carouselMovies = data.slice(0, 8); // Primeras 8 películas para el carrusel
            const movieList = data;                  // Todas las películas para la lista de películas

            // Mostrar películas en el carrusel
            const carousel = document.getElementById('carousel');
            carouselMovies.forEach(p => {
                let slide = document.createElement('div');
                slide.classList.add('carousel-slide');
                slide.innerHTML = `
                    <img src="${p.portada}" alt="${p.titulo}" class="movie-poster">
                    <p class="movie-title">${p.titulo}</p>
                `;
                carousel.appendChild(slide);
            });

            // Inicializar el carrusel en la primera posición
            showSlide(currentIndex);

            // Mostrar películas en la lista
            const movieListContainer = document.getElementById('movie-list');
            movieList.forEach(p => {
                let movieItem = document.createElement('div');
                movieItem.classList.add('movie');
                movieItem.innerHTML = `
                    <img src="${p.portada}" alt="${p.titulo}" class="movie-poster">
                    <p class="movie-title">${p.titulo}</p>
                `;

                // Añade el evento de clic para abrir la página de detalles
                movieItem.addEventListener('click', () => {
                    // Guarda los detalles de la película en localStorage
                    localStorage.setItem('selectedMovie', JSON.stringify(p));

                    // Redirige a la página de detalles
                    window.location.href = '../html/detallesPelicula.html';
                });

                movieListContainer.appendChild(movieItem);
            });
        })
        .catch(error => console.error("Error al cargar las películas:", error));
};

// Función para mostrar el slide del carrusel
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) currentIndex = 0;
    if (index < 0) currentIndex = totalSlides - 1;

    const offset = -currentIndex * 100;
    document.getElementById('carousel').style.transform = `translateX(${offset}%)`;
}

// Función para mover el slide del carrusel
function moveSlide(direction) {
    currentIndex += direction;
    showSlide(currentIndex);
}