using Microsoft.AspNetCore.Mvc;
using CineZarAPI.Models;
using Newtonsoft.Json;

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
            sala.asientos = updatedSala.asientos;
            sala.pelicula = updatedSala.pelicula;
            sala.NumeroSala = updatedSala.NumeroSala;
            sala.Hora = updatedSala.Hora;

            return NoContent();
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
        }
    }
}