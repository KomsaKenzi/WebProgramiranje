using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace BolnicaServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VeterinarController : ControllerBase
    {
        public BolnicaContext Context { get; set; }

        public VeterinarController(BolnicaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiVeterinare/{idBolnice}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiVeterinare(int idBolnice)
        {
            try
            {
                if (idBolnice < 0 || !Context.Bolnice.Any(b => b.ID == idBolnice))
                {
                    return BadRequest("Bolnica ne postoji");
                }

                return (Ok(
                    await Context.Veterinari
                    .Where(b => b.Bolnica.ID == idBolnice)
                    .Select(b =>
                        new
                        {
                            Ime = b.Ime,
                            Prezime = b.Prezime,
                            Nadimak = b.Nadimak
                        }
                    ).ToListAsync()
                ));
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiStatistikuVeterinara/{idBolnice}/{datum}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiStatistiku(int idBolnice, DateTime datum)
        {
            try
            {
                if (idBolnice < 0 || !Context.Bolnice.Any(b => b.ID == idBolnice))
                {
                    return BadRequest("Bolnica ne postoji");
                }

                var posloviCena = Context.Poslovi
                .Where(n => n.Vreme.Date == datum.Date)
                .Join(
                    Context.PosloviUsluge,
                    posao => posao.ID,
                    spoj => spoj.Posao.ID,
                    (posao, spoj) => new
                    {
                        IDPosla = posao.ID,
                        Cena = spoj.Usluga.Cena
                    }
                )
                .GroupBy(p => p.IDPosla)
                .Select(p =>
                    new
                    {
                        IDPosla = p.Key,
                        Ukupno = p.Sum(q => q.Cena)
                    }
                );

                var statistika = posloviCena
                .Join(
                    Context.Poslovi,
                    posCene => posCene.IDPosla,
                    pos => pos.ID,
                    (posCene, pos) => new
                    {
                        pos.ID,
                        pos.Veterinar,
                        posCene.Ukupno
                    }

                )
                .Where(p => p.Veterinar.Bolnica.ID == idBolnice)
                .GroupBy(p =>
                    new
                    {
                        Nadimak = p.Veterinar.Nadimak,
                        Plata = p.Veterinar.Plata,
                        Bolnica = p.Veterinar.Bolnica.Naziv
                    }
                )
                .Select(p =>
                    new
                    {
                        Nadimak = p.Key.Nadimak,
                        Dnevnica = Math.Round(p.Key.Plata * 12 / 365.25, 2),
                        Bolnica = p.Key.Bolnica,                    
                        Ukupno = p.Sum(q => q.Ukupno),          
                        BrojUsluzenih = p.Count()                
                    }
                );

                return Ok(await statistika.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }
    }
}