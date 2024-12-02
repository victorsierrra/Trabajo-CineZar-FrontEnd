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
const peliculaSeleccionada = JSON.parse(localStorage.getItem('selectedMovie'));


window.onload = function () {


    if (peliculaSeleccionada) {
        console.log(peliculaSeleccionada)
        document.getElementById('titulo-pelicula').innerText = peliculaSeleccionada.titulo
        document.getElementById('sesiones__movie-poster').src = peliculaSeleccionada.portada

    } else {
        document.getElementByClassName("titulo-pelicula").textContent = "Película no encontrada";
        document.getElementByClassName("session-cards").innerHTML = "<p>No hay sesiones disponibles.</p>";
    }
}

fetch(`https://localhost:7165/api/Pelicula/${peliculaSeleccionada.id}/VerSesiones`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(datosSesion => {
            let date = new Date(datosSesion.horaSesion)
            let dia = date.toLocaleString('es-ES', { weekday: 'long' }).toUpperCase();
            let diaNumerico = date.toLocaleString('es-ES', { day: 'numeric', month: 'short' })
            let hora = date.toLocaleString('es-ES', {hour: '2-digit', minute: '2-digit' })
            let result = 0;
            datosSesion.asientos.forEach(asiento => {
                if (asiento.comprado === false)
                {
                    result++
                }
            })

            let datosDia = {
                idSesion: datosSesion.id,
                    horaPelicula: hora,
                    diaNumericoPelicula: diaNumerico,
                    precioSesion: datosSesion.precioEntrada.toFixed(2),
                    asientosLibres: result
            }
            switch (dia) {
                case "LUNES":
                    Lunes.push(datosDia)
                    break;
                case "MARTES":
                    Martes.push(datosDia)
                    break;
                case "MIÉRCOLES":
                    Miercoles.push(datosDia)
                    break;
                case "JUEVES":
                    Jueves.push(datosDia)
                    break;
                case "VIERNES":
                    Viernes.push(datosDia)
                    break;
                case "SÁBADO":
                    Sabado.push(datosDia)
                    break;
                case "DOMINGO":
                    Domingo.push(datosDia)
                    break;
                default:
                    console.log("No se puede gestionar")
            }
        });
        cargarSesiones(dias[0])
        // console.log(Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo)
    })
    .catch(error => console.log(error))


// Cargar la película al cargar la página
window.onload = cargarPelicula() ;


function cambiarDia(direccion) {

    // console.log("clog --------" + direccion);
    let _diaActual = diaActual
    console.log("clog ---------" +_diaActual + "------------------   " + dias[diaActual])
    diaActual = (_diaActual + direccion + dias.length) % dias.length;
    cargarSesiones(dias[diaActual]);

}
function cargarSesiones(dia) {
    const horarios = dia;
    // console.log("clog---------- horario" + horarios)
    document.getElementById("dia-seleccionado").textContent = diasLetra[diaActual];

    const sessionCards = document.getElementById("session-cards");
    sessionCards.innerHTML = ""; // Limpiar las sesiones actuales

    let diaActualHorario = "";
    horarios.forEach(horario => {
        const card = document.createElement("div");
        card.className = "session-card";
        card.id = horario.idSesion;
        card.textContent = `Hora: ${horario.horaPelicula}  -  Precio: ${horario.precioSesion}€  -  Asientos libres: ${horario.asientosLibres}`;
        card.setAttribute('onclick', `seleccionarSesion(${card.id})`)
        sessionCards.appendChild(card);
        diaActualHorario = horario.diaNumericoPelicula;
    });

    document.getElementById("dia-seleccionado").textContent = diaActualHorario + " - " + diasLetra[diaActual];
}
function seleccionarSesion(id)
{
    localStorage.setItem("idSesion", id);
    window.location.href = '../html/mapaAsientos.html'
}