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
    public class BolnicaController : ControllerBase
    {
        public BolnicaContext Context { get; set; }

        public BolnicaController(BolnicaContext context)
        {
            Context = context;
        }

        

        [Route("PreuzmiSale/{idBolnice}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSale(int idBolnice)
        {
            try
            {
                if (!Context.Bolnice.Any(b => b.ID == idBolnice))
                {
                    return BadRequest("Bolnica ne postoji");
                }

                return Ok(
                    await Context.Sale.
                    Where(s => s.Bolnica.ID == idBolnice).
                    Select(s =>
                        new
                        {
                            ID = s.ID,
                            BrojPacijenta = s.BrojPacijenta,

                            XPozicija = s.PozicijaX,
                            YPozicija = s.PozicijaY,
                            Slobodana = s.Slobodana
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }

        }

        [Route("PreuzmiBolnice")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiBolnice()
        {
            try
            {
                return Ok(await Context.Bolnice.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }
    }
}
