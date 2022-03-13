using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Posao
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(250)]
        public string DodatnoUputstvo { get; set; }

        public DateTime Vreme { get; set; }

        public bool Izvrsen{ get; set; }

        public virtual Veterinar Veterinar { get; set; }
        
        public virtual Sala Sala { get; set; }

        public virtual List<SpojPosaoUsluga> PosaoUsluga { get; set; }
    }
}