namespace CineZarAPI.Models;

public class Sala
{
    public Pelicula pelicula { get; set; }
    public int Id { get; private set; } = 0;
    private static int Identificador { get; set; } = 0;
    public List<Asiento> asientos { get; set; }
    public int NumeroSala { get; set; } = 1;
    public string Hora { get; set; } = DateTime.Now.ToString("HH:mm");

    public Sala(Pelicula peli, string hora, int numeroSala)
    {
        pelicula = peli;
        Identificador ++;
        Id = Identificador;
        CrearAsientos(asientos);
        NumeroSala = numeroSala;
        Hora = hora;

    }

    public List<Asiento> CrearAsientos(List<Asiento> pAsientos)
    {
        char[] Letras = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' };

        for (int y = 0; y < 8; y++)
        {
            for (int x = 0; x < 15; x++)
            {
                pAsientos.Add(new Asiento(Letras[y], x + 1));
            }
        }
        return pAsientos;
    }
}