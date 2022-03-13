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
    public class PosaoController : ControllerBase
    {
        public BolnicaContext Context { get; set; }

        public PosaoController(BolnicaContext context)
        {
            Context = context;
        }

        [Route("DodajPosao/{nazivBolnice}/{xSale}/{ySale}")]
        [HttpPost]
        public async Task<ActionResult> DodajPosao(string nazivBolnice, int xSale, int ySale, [FromQuery] int[] usluge, string nadimakVeterinara, string uputstvo)
        {
            if (xSale < 0 || ySale < 0)
            {
                return BadRequest("Pozicija sale nije validna");
            }
            try
            {
                var bolnica = await Context.Bolnice
                    .Where(b => b.Naziv == nazivBolnice)
                    .FirstOrDefaultAsync();
                var sala = await Context.Sale
                    .Where(s => s.PozicijaX == xSale && s.PozicijaY == ySale && s.Bolnica.Naziv == nazivBolnice)
                    .FirstOrDefaultAsync();
                if (sala == null || bolnica == null)
                {
                    return BadRequest("Sala na ovoj poziciji ne postoji!");
                }
                if (!sala.Slobodana)
                {
                    return BadRequest("Salu koji zahtevate je trenutno zauzeta");
                }
                Veterinar veterinar = await Context.Veterinari
                    .Where(v => v.Nadimak == nadimakVeterinara && v.Bolnica.Naziv == nazivBolnice)
                    .FirstOrDefaultAsync();
                if (veterinar == null)
                {

                    veterinar = await Context.Veterinari.
                        Where(v => v.Bolnica.ID == bolnica.ID).
                        OrderBy(x => Guid.NewGuid()).
                        Take(1).
                        FirstOrDefaultAsync();
                }
                sala.Slobodana = false;
                var posao = new Posao
                {
                    Vreme = DateTime.Now,
                    Veterinar = veterinar,
                    Sala = sala,
                    DodatnoUputstvo = uputstvo,
                    Izvrsen = false
                };
                Context.Poslovi.Add(posao);
                foreach (int usluga in usluge)
                {
                    SpojPosaoUsluga stavka = new SpojPosaoUsluga
                    {
                        Posao = posao,
                        Usluga = await Context.Usluge.FindAsync(usluga)
                    };
                    Context.PosloviUsluge.Add(stavka);
                }
                await Context.SaveChangesAsync();
                return Ok(posao.ID);

            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }

        }

        [Route("IzvrsiPosao/{idPosla}/{idSale}")]
        [HttpPut]
        public async Task<ActionResult> IzvrsiPosao(int idPosla, int idSale)
        {
            if (idPosla <= 0 || !Context.Poslovi.Any(p => p.ID == idPosla))
            {
                return BadRequest("ID posla nije validan");
            }
            if (idSale <= 0 || !Context.Sale.Any(s => s.ID == idSale))
            {
                return BadRequest("ID sale nije validan");
            }
            try
            {
                var posao = await Context.Poslovi.FindAsync(idPosla);
                if (posao == null)
                {
                    return BadRequest("Posao nije pronadjen");
                }
                var sala = await Context.Sale.FindAsync(idSale);
                if (sala == null)
                {
                    return BadRequest("Sala nije pronadjena");
                }
                posao.Izvrsen = true;
                sala.Slobodana = true;
                await Context.SaveChangesAsync();
                return Ok("Posao je uspesno izvrsen");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("ObrisiPosao/{idPosla}/{idSale}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPosao(int idPosla, int idSale)
        {
            if (idPosla <= 0 || !Context.Poslovi.Any(p => p.ID == idPosla))
            {
                return BadRequest("ID posla nije validan");
            }
            if (idSale <= 0 || !Context.Sale.Any(s => s.ID == idSale))
            {
                return BadRequest("ID sale nije validan");
            }
            try
            {
                foreach (var red in Context.PosloviUsluge.Where(p => p.Posao.ID == idPosla))
                {
                    Context.PosloviUsluge.Remove(red);
                }
                var posao = await Context.Poslovi.FindAsync(idPosla);
                if (posao == null)
                {
                    return BadRequest("Posao nije pronadjen");
                }
                var sala = await Context.Sale.FindAsync(idSale);
                if (sala == null)
                {
                    return BadRequest("Sala nije pronadjena");
                }
                sala.Slobodana = true;
                Context.Poslovi.Remove(posao);
                await Context.SaveChangesAsync();
                return Ok("Posao je uspesno obrisan");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiPosaoOdSale/{idSale}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiPosaoOdSale(int idSale)
        {
            try
            {
                if (idSale <= 0 || !Context.Sale.Any(s => s.ID == idSale))
                {
                    return BadRequest("ID sale nije validan");
                }
                var posao = Context.Poslovi
                .Where(p => p.Izvrsen == false)
                .Include(p => p.Veterinar)
                .Include(p => p.PosaoUsluga.Where(q => q.Posao.ID == p.ID))
                .ThenInclude(p => p.Usluga)
                .Include(p => p.Sala)
                .ThenInclude(p => p.Bolnica)
                .Where(p => p.Sala.ID == idSale);

                return Ok
                (
                    await posao
                                    
                    .Select(p =>
                        new
                        {
                            ID = p.ID,
                            Bolnica = p.Sala.Bolnica.Naziv,
                            Vreme = p.Vreme,
                            DodatnoUputstvo = p.DodatnoUputstvo,
                            Veterinar = new
                            {
                                ID = p.Veterinar.ID,
                                Nadimak = p.Veterinar.Nadimak
                            },
                            SalaID = p.Sala.ID,
                            Usluga = p.PosaoUsluga
                            .Select(q =>
                                new
                                {
                                    ID = q.Usluga.ID,
                                    Naziv = q.Usluga.Naziv,
                                    Cena = q.Usluga.Cena
                                }
                            )
                        }

                    ).FirstOrDefaultAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }




    }
}