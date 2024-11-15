let Lunes = []
let Martes = []
let Miercoles = []
let Jueves = []
let Viernes = []
let Sabado = []
let Domingo = []
let dias = [Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo];
let diasLetra = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
let diaActual = 0;

window.onload = function (e) {


    const peliculaSeleccionada = JSON.parse(localStorage.getItem('selectedMovie'))
    console.log(peliculaSeleccionada.id)

    function cargarPelicula() {
        if (pelicula) {
            document.getElementById("titulo-pelicula").innerText = peliculaSeleccionada.titulo;
            document.getElementById("movie-poster").src = peliculaSeleccionada.imagen;  // Establecer la imagen de la película
            cargarSesiones(dias[diaActual]);
        } else {
            document.getElementById("titulo-pelicula").textContent = "Película no encontrada";
            document.getElementById("session-cards").innerHTML = "<p>No hay sesiones disponibles.</p>";
        }
    }
    fetch(`https://localhost:7165/api/Pelicula/VerSesiones/${peliculaSeleccionada.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(fecha => {
                let date = new Date(fecha.horaSesion)
                let dia = date.toLocaleString('es-ES', { weekday: 'long' }).toUpperCase();
                let hora = date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })
                console.log(`${dia} a las ${hora}`);
                switch (dia) {
                    case "LUNES":
                        Lunes.push(hora)
                        break;
                    case "MARTES":
                        Martes.push(hora)
                        break;
                    case "MIÉRCOLES":
                        Miercoles.push(hora)
                        break;
                    case "JUEVES":
                        Jueves.push(hora)
                        break;
                    case "VIERNES":
                        Viernes.push(hora)
                        break;
                    case "SÁBADO":
                        Sabado.push(hora)
                        break;
                    case "DOMINGO":
                        Domingo.push(hora)
                        break;
                    default:
                        console.log("No se puede gestionar")
                }

                // console.log(Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo)
                // console.log("clog - dias ------" + dias)
            });
            console.log(Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo)
        })
        .catch(error => console.log(error))


    // Cargar la película al cargar la página
    window.onload = cargarPelicula;
}
function cambiarDia(direccion) {

    console.log("clog --------" + direccion);
    let _diaActual = diaActual
    diaActual = (_diaActual + direccion + dias.length) % dias.length;
    cargarSesiones(dias[diaActual]);

}
function cargarSesiones(dia) {
    const horarios = dia;
    console.log("clog---------- horario" + horarios)
    document.getElementById("dia-seleccionado").textContent = diasLetra[diaActual];
    console.log

    const sessionCards = document.getElementById("session-cards");
    sessionCards.innerHTML = ""; // Limpiar las sesiones actuales

    horarios.forEach(horario => {
        const card = document.createElement("div");
        card.className = "session-card";
        card.textContent = horario;
        sessionCards.appendChild(card);
    });
}