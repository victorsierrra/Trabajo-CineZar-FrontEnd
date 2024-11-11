using Microsoft.AspNetCore.Mvc;
using CineZarAPI.Models;

namespace CineZarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PeliculaController : ControllerBase
    {
        private static List<Pelicula> peliculas = new List<Pelicula>();


        [HttpGet]
        public ActionResult<IEnumerable<Pelicula>> GetPeliculas()
        {
            return Ok(peliculas);
        }

        [HttpGet("{id}")]
        public ActionResult<Pelicula> GetPelicula(int id)
        {
            Pelicula pelicula = peliculas.FirstOrDefault(p => p.Id == id);
            if (pelicula == null)
            {
                return NotFound();
            }
            return Ok(pelicula);
        }

        [HttpPost]
        public ActionResult<Pelicula> CreatePelicula(Pelicula pelicula)
        {
            peliculas.Add(pelicula);
            return CreatedAtAction(nameof(GetPelicula), new { id = pelicula.Id }, pelicula);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePelicula(int id, Pelicula updatedPelicula)
        {
            Pelicula pelicula = peliculas.FirstOrDefault(p => p.Id == id);
            if (pelicula == null)
            {
                return NotFound();
            }
            pelicula.Titulo = updatedPelicula.Titulo;
            pelicula.Sinopsis = updatedPelicula.Sinopsis;
            pelicula.Director = updatedPelicula.Director;
            pelicula.Duracion = updatedPelicula.Duracion;
            pelicula.Portada = updatedPelicula.Portada;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePelicula(int id)
        {
            Pelicula pelicula = peliculas.FirstOrDefault(p => p.Id == id);
            if (pelicula == null)
            {
                return NotFound();
            }
            peliculas.Remove(pelicula);
            return NoContent();
        }

        public static void InicializarDatos()
        {
            peliculas.Add(new Pelicula("Cars", "El aspirante a campeón de carreras Rayo McQueen parece que está a punto de conseguir el éxito. Su actitud arrogante se desvanece cuando llega a una pequeña comunidad olvidada que le enseña las cosas importantes de la vida que había olvidado.",
            "Brian Free", 117, "https://pics.filmaffinity.com/Cars-746710621-large.jpg"));
            peliculas.Add(new Pelicula("Torrente, El brazo tonto de la ley", "Torrente es un policía español, machista, racista y alcohólico. Este magnífico representante de las fuerzas del orden vive, con su padre hemipléjico, en Madrid. Gracias a su olfato, descubre en su propio barrio una importante red de narcotraficantes.",
            "Santiago Segura", 97, "https://play-lh.googleusercontent.com/jOSN3SUTJStEHHKBNZ8Hidy_ZTsW8eiOYE30BYh7jWxKPK-RcoGyZFKbTZjezSZSwfsY"));
            peliculas.Add(new Pelicula("Mientras dure la guerra", "España, 1936. El célebre escritor Miguel de Unamuno decide apoyar públicamente la sublevación militar. Inmediatamente es destituido por el gobierno republicano como rector de la Universidad de Salamanca. Mientras, el general Franco consigue sumar sus tropas al frente sublevado e inicia una exitosa campaña.",
            "Alejandro Amenábar", 107, "https://pics.filmaffinity.com/Mientras_dure_la_guerra-641777203-large.jpg"));
            peliculas.Add(new Pelicula("Proyecto X", "Tres amigos del instituto deciden organizar una fiesta salvaje en casa de uno de ellos, aprovechando que sus padres no están. Quieren hacer que la fiesta sea inolvidable, así que deciden grabarlo todo. Parece que la fiesta sea todo un éxito: todo el mundo está bebiendo y los ánimos están por los aires. Sin embargo, una serie de complicaciones imprevistas harán que la fiesta se descontrole.",
           "Nourizadeh Nima", 88, "https://pics.filmaffinity.com/Proyecto_X-393876705-large.jpg"));
            peliculas.Add(new Pelicula("Ted", "John Bennett y su oso de peluche Ted han sido siempre inseparables, pero su amistad se pondrá a prueba cuando Lori, la novia de John de cuatro años, pida más de su relación.",
            "Seth MacFarlane", 106, "https://es.web.img3.acsta.net/medias/nmedia/18/86/62/03/20141188.jpg"));
            peliculas.Add(new Pelicula("The Fast and the Furious: Tokyo Drift", "Shaun Boswell es un chico rebelde cuya única conexión con el mundo es a través de las carreras ilegales. Cuando la policía le amenaza con encarcelarle, se va a pasar una temporada con su tío, un militar destinado en Japón.",
            "Justin Lin", 104, "https://play-lh.googleusercontent.com/FZHvrDnFWT8Cuc06_mVO72SE8igxA2P5B4DP3Yoa4D1k_-AvuVxIvx0dK7jd9eqTKOSD"));
            peliculas.Add(new Pelicula("Resacón en Las Vegas", "Cuatro amigos celebran la despedida de soltero de uno de ellos en Las Vegas. Pero, cuando a la mañana siguiente no pueden encontrar al novio y no recuerdan nada, deberán intentar volver sobre sus pasos, antes de que llegue la hora de la boda.",
           "Todd Phillips", 100, "https://pics.filmaffinity.com/Resacaon_en_Las_Vegas-825442102-large.jpg"));
            peliculas.Add(new Pelicula("The First Purge", "La crisis social y económica que atenaza a Estados Unidos ha llevado al poder al partido populista Nuevos Padres Fundadores de América y a su discurso del miedo. Una de sus primeras medidas será un experimento: una noche de crimen legalizado en la zona de Staten Island. ¡Que comience la purga!",
           "Gerard McMurray", 98, "https://es.web.img3.acsta.net/pictures/18/06/12/12/08/0619875.jpg"));
        }
    }
}