let currentIndex = 0;

window.onload = function () {
    console.log("Documento Cargado");

    // Fetch de las películas
    fetch("http://localhost:8080/api/Pelicula")
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
                slide.style.backgroundImage = `url(${p.portada})`
                carousel.appendChild(slide);
            });

            // Inicializar el carrusel en la primera posición
            showSlide(currentIndex);

            // Mostrar películas en la lista
            const movieListContainer = document.getElementById('movie-list');
            movieList.forEach(p => {
                let movieItem = document.createElement('div');
                movieItem.classList.add('movies-section__movie');
                let movieFoto = document.createElement('div')
                movieFoto.classList.add('movie-poster')
                movieItem.appendChild(movieFoto)
                movieFoto.style.backgroundImage = `url(${p.portada})`

                movieItem.innerHTML = `
                    <div class="movie-title">${p.titulo}</div>
                `;

                // Añade el evento de clic para abrir la página de detalles
                movieItem.addEventListener('click', () => {
                    // Guarda los detalles de la película en localStorage
                    localStorage.setItem('selectedMovie', JSON.stringify(p));

                    // Redirige a la página de detalles
                    window.location.href = '../html/detallesPelicula.html';
                });

                movieListContainer.appendChild(movieItem);
                movieFoto.style.backgroundImage = `url(${p.portada})`
                movieItem.appendChild(movieFoto)
            });
        })
        .catch(error => console.error("Error al cargar las películas:", error));
};

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

//funcion para modal oferta
document.addEventListener("DOMContentLoaded", () => {
    const ofertas = document.querySelectorAll(".imagen__oferta img");
    const modal = document.getElementById("modalOferta");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeButton = document.querySelector(".close-button");

    // Información de las ofertas
    const ofertaInfo = [
        {
            title: "Cine a precio de locura",
            description: "De lunes a jueves, disfruta de tus películas favoritas al precio más bajo. ¡Porque el buen cine también puede ser económico!",
        },
        {
            title: "Miércoles de película",
            description: "El miércoles es tu día: entradas al precio más espectacular de la semana. Vive la magia del cine como nunca antes y ¡al mejor precio!",
        },
    ];

    // Agrega evento de clic a cada imagen
    ofertas.forEach((img, index) => {
        img.addEventListener("click", () => {
            modalTitle.textContent = ofertaInfo[index].title;
            modalDescription.textContent = ofertaInfo[index].description;
            modal.style.display = "block";
        });
    });

    // Cerrar el modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera 
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
