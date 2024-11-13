using Microsoft.AspNetCore.Mvc;
using CineZarAPI.Models;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;

namespace CineZarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class SalaController : ControllerBase
    {
        private static List<Sala> salas = new List<Sala>();


        [HttpGet]
        public ActionResult<IEnumerable<Sala>> GetSalas()
        {
            return Ok(salas);
        }

        [HttpGet("{id}")]
        public ActionResult<Sala> GetSala(int id)
        {
            Sala sala = salas.FirstOrDefault(s => s.Id == id);
            if (sala == null)
            {
                return NotFound();
            }
            return Ok(sala);
        }

        [HttpPost]
        public ActionResult<Sala> CreateSala(Sala sala)
        {
            salas.Add(sala);
            return CreatedAtAction(nameof(GetSala), new { id = sala.Id }, sala);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateSala(int id, Sala updatedSala)
        {
            Sala sala = salas.FirstOrDefault(s => s.Id == id);
            if (sala == null)
            {
                return NotFound();
            }
            sala.Asientos = updatedSala.Asientos;
            sala.pelicula = updatedSala.pelicula;
            sala.NumeroSala = updatedSala.NumeroSala;
            sala.Hora = updatedSala.Hora;

            return NoContent();
        }


        [HttpPut("ComprarEntrada{id}")]
        public IActionResult ComprarEntrada(int id, int idAsiento, bool comprado)
        {
            Sala sala = salas.FirstOrDefault(s => s.Id == id);

            if (sala == null)
            {
                return NotFound();
            }

            Asiento asientoEntrada = sala.Asientos.FirstOrDefault(a => a.Id == idAsiento);

            int posicion = sala.Asientos.IndexOf(asientoEntrada);

            if (posicion != -1)
            {
                if (asientoEntrada == null)
                {
                    return NotFound();
                }
                else if (comprado == false)
                {
                    return BadRequest("No se puede cambiar a falso");
                }
                else if (asientoEntrada.Comprado == true)
                {
                    return BadRequest("El asiento ya ha sido comprado");
                }
            }
            else
            {
                return NotFound();
            }
            asientoEntrada.Comprado = true;
            Entrada entrada = new Entrada(asientoEntrada, 4.50);
            sala.Asientos[posicion] = asientoEntrada;
            sala.Entradas.Add(entrada);
            //EnviarEntrada();

            return Ok(sala.Entradas);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSala(int id)
        {
            Sala sala = salas.FirstOrDefault(s => s.Id == id);
            if (sala == null)
            {
                return NotFound();
            }
            salas.Remove(sala);
            return NoContent();
        }

        public static void InicializarDatos()
        {
            Pelicula Cars = new Pelicula("Cars", "El aspirante a campeón de carreras Rayo McQueen parece que está a punto de conseguir el éxito. Su actitud arrogante se desvanece cuando llega a una pequeña comunidad olvidada que le enseña las cosas importantes de la vida que había olvidado.",
            "Brian Free", 117, "https://www.mubis.es/media/covers/2430/5375/cars-portada-l_cover.jpg");
            Pelicula Torrente = new Pelicula("Torrente, El brazo tonto de la ley", "Torrente es un policía español, machista, racista y alcohólico. Este magnífico representante de las fuerzas del orden vive, con su padre hemipléjico, en Madrid. Gracias a su olfato, descubre en su propio barrio una importante red de narcotraficantes.",
            "Santiago Segura", 97, "https://play-lh.googleusercontent.com/jOSN3SUTJStEHHKBNZ8Hidy_ZTsW8eiOYE30BYh7jWxKPK-RcoGyZFKbTZjezSZSwfsY");
            Pelicula MientrasDureLaGuerra = new Pelicula("Mientras dure la guerra", "España, 1936. El célebre escritor Miguel de Unamuno decide apoyar públicamente la sublevación militar. Inmediatamente es destituido por el gobierno republicano como rector de la Universidad de Salamanca. Mientras, el general Franco consigue sumar sus tropas al frente sublevado e inicia una exitosa campaña.",
            "Alejandro Amenábar", 107, "https://pics.filmaffinity.com/Mientras_dure_la_guerra-641777203-large.jpg");
            Pelicula ProyectoX = new Pelicula("Proyecto X", "Tres amigos del instituto deciden organizar una fiesta salvaje en casa de uno de ellos, aprovechando que sus padres no están. Quieren hacer que la fiesta sea inolvidable, así que deciden grabarlo todo. Parece que la fiesta sea todo un éxito: todo el mundo está bebiendo y los ánimos están por los aires. Sin embargo, una serie de complicaciones imprevistas harán que la fiesta se descontrole.",
           "Nourizadeh Nima", 88, "https://pics.filmaffinity.com/Proyecto_X-393876705-large.jpg");
            Pelicula Ted = new Pelicula("Ted", "John Bennett y su oso de peluche Ted han sido siempre inseparables, pero su amistad se pondrá a prueba cuando Lori, la novia de John de cuatro años, pida más de su relación.",
             "Seth MacFarlane", 106, "https://pics.filmaffinity.com/Ted-453692525-large.jpg");
            Pelicula FastAndFurious = new Pelicula("The Fast and the Furious: Tokyo Drift", "Shaun Boswell es un chico rebelde cuya única conexión con el mundo es a través de las carreras ilegales. Cuando la policía le amenaza con encarcelarle, se va a pasar una temporada con su tío, un militar destinado en Japón.",
            "Justin Lin", 104, "https://play-lh.googleusercontent.com/FZHvrDnFWT8Cuc06_mVO72SE8igxA2P5B4DP3Yoa4D1k_-AvuVxIvx0dK7jd9eqTKOSD");
            Pelicula Resacon = new Pelicula("Resacón en Las Vegas", "Cuatro amigos celebran la despedida de soltero de uno de ellos en Las Vegas. Pero, cuando a la mañana siguiente no pueden encontrar al novio y no recuerdan nada, deberán intentar volver sobre sus pasos, antes de que llegue la hora de la boda.",
           "Todd Phillips", 100, "https://pics.filmaffinity.com/Resacaon_en_Las_Vegas-825442102-large.jpg");
            Pelicula Purga = new Pelicula("The First Purge", "La crisis social y económica que atenaza a Estados Unidos ha llevado al poder al partido populista Nuevos Padres Fundadores de América y a su discurso del miedo. Una de sus primeras medidas será un experimento: una noche de crimen legalizado en la zona de Staten Island. ¡Que comience la purga!",
            "Gerard McMurray", 98, "https://es.web.img3.acsta.net/pictures/18/06/12/12/08/0619875.jpg");



            Sala Cars1 = new Sala(Cars, "16:00", 1);
            Sala Cars2 = new Sala(Cars, "19:00", 1);
            Sala Torrente1 = new Sala(Torrente, "17:00", 2);
            Sala Torrente2 = new Sala(Torrente, "20:00", 2);
            salas.Add(Cars1);
            salas.Add(Cars2);
            salas.Add(Torrente1);
            salas.Add(Torrente2);
        }

        static void EnviarEntrada()
        {
            try
            {
                Sala sala = salas.FirstOrDefault(s => s.Id == 1);
                Entrada entrada = sala.Entradas.Last();
                string to = "a27300@svalero.com";
                string asunto = "Prueba";
                string cuerpo = $"Enhorabuena por adquirir las entradas para ver {sala.pelicula.Titulo} a las {sala.Hora}.\n Ha seleccionado sentarse en la fila {entrada.asiento.fila} en el asiento {entrada.asiento.Numero} y tiene que acudir a la sala {sala.NumeroSala}, se le recomienda llegar con 30 minutos de antelación.\n ¡Que disfrute la experiencia cineZar!";
                string host = "smtp.gmail.com";
                int puerto = 587;
                SmtpClient client = new SmtpClient(host);

                client.Port = puerto;

                client.Credentials = new NetworkCredential(Constantes.CorreoEntradas, Constantes.PasCorreoEntradas);

                MailMessage mensaje = new MailMessage(Constantes.CorreoEntradas, to, asunto, cuerpo);

                mensaje.IsBodyHtml = false;

                client.Send(mensaje);
                Console.WriteLine("Correo enviado correctamente");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

            }


        }
    }
}