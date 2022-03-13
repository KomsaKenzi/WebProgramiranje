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
    public class UslugaController : ControllerBase
    {
        public BolnicaContext Context { get; set; }

        public UslugaController(BolnicaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiKategorije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKategorije()
        {
            try
            {
                return Ok
                (
                    await Context.Kategorije.Select(p =>
                        new
                        {
                            ID = p.ID,
                            Naziv = p.Naziv
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }



        [Route("DodajUslugu")]
        [HttpPost]
        public async Task<ActionResult> DodajUslugu([FromQuery] string naziv, int cena, int kolicina, string opis, int idKategorije)
        {
            if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Naziv nije validan");
            }
            if (cena < 0 || cena > 30000)
            {
                return BadRequest("Cena nije validna");
            }
            if (kolicina < 0 || kolicina > 30)
            {
                return BadRequest("Kolicina nije validna");
            }
            if (opis != null && (opis.Length > 250))
            {
                return BadRequest("Opis nije validan");
            }
            if (idKategorije < 0)
            {
                return BadRequest("Kategorija nije validna");
            }
            try
            {
                var usluga = new Usluga
                {
                    Naziv = naziv,
                    Cena = cena,
                    Kolicina = kolicina,
                    Opis = opis,
                    Kategorija = await Context.Kategorije.FindAsync(idKategorije)
                };
                Context.Usluge.Add(usluga);
                await Context.SaveChangesAsync();
                return Ok(usluga.ID);
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiUsluge/{idKategorije}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiUsluge(int idKategorije)
        {
            if (idKategorije < 0 || !Context.Kategorije.Any(k => k.ID == idKategorije))
            {
                return BadRequest("ID kategorije nije validan");
            }
            try
            {
                return Ok
                (
                    await Context.Usluge
                    .Where(p => p.Kategorija.ID == idKategorije)
                    .Select(p =>
                        new
                        {
                            ID = p.ID,
                            Naziv = p.Naziv,
                            Cena = p.Cena,
                            IDKategorije = p.Kategorija.ID,
                            NazivKategorije = p.Kategorija.Naziv,
                            Kolicina = p.Kolicina,
                            Opis = p.Opis
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("ObrisiUslugu/{idUsluge}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiUslugu(int idUsluge)
        {
            if (idUsluge < 0 || !Context.Usluge.Any(p => p.ID == idUsluge))
            {
                return BadRequest("ID nije validan");
            }
            try
            {
                var usluga = await Context.Usluge.FindAsync(idUsluge);
                if (usluga == null)
                    return BadRequest("Usluga sa ovim ID ne postoji");
                string naziv = new string(usluga.Naziv);
                Context.Usluge.Remove(usluga);
                await Context.SaveChangesAsync();
                return Ok($"Usluga {naziv} je uspesno obrisan!");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PromeniUslugu")]
        [HttpPut]
        public async Task<ActionResult> PromeniUslugu([FromBody] Usluga usluga)
        {
            if (string.IsNullOrWhiteSpace(usluga.Naziv) || usluga.Naziv.Length > 50)
            {
                return BadRequest("Naziv nije validan");
            }
            if (usluga.Cena < 0 || usluga.Cena > 30000)
            {
                return BadRequest("Cena nije validna");
            }
            if (usluga.Kolicina < 0 || usluga.Kolicina > 30)
            {
                return BadRequest("Kolicina nije validna");
            }
            if (usluga.Opis != null && (usluga.Opis.Length > 250))
            {
                return BadRequest("Opis nije validan");
            }
            try
            {
                Context.Usluge.Update(usluga);
                await Context.SaveChangesAsync();
                return Ok($"Usluga {usluga.Naziv} je uspesno promenjen");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }


    }
}