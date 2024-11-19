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
                slide.classList.add('banner__carousel-slide');
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
                movieItem.classList.add('movies-section__movie');
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

document.addEventListener("DOMContentLoaded", function () {
    // Realizar un fetch al endpoint del backend para obtener las ofertas
    fetch('http://localhost:5000/api/oferta')  // Para localhost

        .then(response => response.json())
        .then(data => {
            // Verificar que se está recibiendo la respuesta correcta
            console.log(data); // Verifica en la consola que lleguen las ofertas

            // Obtener el contenedor donde se agregarán las ofertas
            const ofertaContainer = document.getElementById('oferta');

            // Verificar si hay datos de ofertas
            if (data.length > 0) {
                // Iterar sobre las ofertas y agregarlas al contenedor
                data.forEach(oferta => {
                    const ofertaElement = document.createElement('div');
                    ofertaElement.classList.add('oferta-item'); // Agregar una clase para estilizar

                    // Crear el contenido HTML para cada oferta
                    ofertaElement.innerHTML = `
                        <h3>${oferta.titulo}</h3>
                        <img src="${oferta.imagenUrl}" alt="${oferta.titulo}">
                        <p>${oferta.descripcion}</p>
                    `;

                    // Agregar la oferta al contenedor
                    ofertaContainer.appendChild(ofertaElement);
                });
            } else {
                // Si no hay ofertas, mostrar un mensaje
                ofertaContainer.innerHTML = '<p>No hay ofertas disponibles.</p>';
            }
        })
        .catch(error => console.error('Error al cargar las ofertas:', error));
});


// Función para mostrar el slide del carrusel
function showSlide(index) {
    const slides = document.querySelectorAll('.banner__carousel-slide');
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