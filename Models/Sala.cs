using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sala
    {
        [Key]
        public int ID { get; set; }

        [Range(1, 15)]
        public int BrojPacijenta { get; set; }

        [Range(1, 50)]
        public int PozicijaX { get; set; }

        [Range(1, 50)]
        public int PozicijaY { get; set; }

        public bool Slobodana { get; set; }

        public virtual Bolnica Bolnica { get; set; }


        public virtual List<Posao> PosaoSala { get; set; }


    }
}