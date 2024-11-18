let dias = [[], [], [], [], [], [], []];
let diasLetra = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
let diaActual = 0;

window.onload = function () {
    const peliculaSeleccionada = JSON.parse(localStorage.getItem('selectedMovie'));
    console.log("clog--------------" + peliculaSeleccionada.sesiones.horaSesion)

    if (peliculaSeleccionada) {
        document.getElementById("titulo-pelicula").innerText = peliculaSeleccionada.titulo;
        document.getElementById("movie-poster").src = peliculaSeleccionada.portada;
        fetchSesiones(peliculaSeleccionada.id);
    } else {
        document.getElementById("titulo-pelicula").textContent = "Película no encontrada";
        document.getElementById("session-cards").innerHTML = "<p>No hay sesiones disponibles.</p>";
    }
};

function fetchSesiones(id) {
    fetch(`https://localhost:7165/api/Pelicula/VerSesiones/${id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(fecha => {
                let date = new Date(fecha.horaSesion);
                let diaSemana = date.getDay();
                let hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                dias[diaSemana].push(hora);
            });
            cargarSesiones(dias[diaActual]);
        })
        .catch(error => console.log(error));
}

function cambiarDia(direccion) {
    diaActual = (diaActual + direccion + dias.length) % dias.length;
    cargarSesiones(dias[diaActual]);
}

function cargarSesiones(dia) {
    document.getElementById("dia-seleccionado").textContent = diasLetra[diaActual];
    const sessionCards = document.getElementById("session-cards");
    sessionCards.innerHTML = "";

    dia.forEach(horario => {
        const card = document.createElement("div");
        card.className = "session-card";
        card.id = 
        card.textContent = horario;
        card.setAttribute("onclick", `seleccionarSesion('2')`)
        sessionCards.appendChild(card);
    });
}
