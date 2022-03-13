using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Usluga
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [Range(0, 30000)]
        public int Cena { get; set; }

        [Range(0, 30)]
        public int Kolicina { get; set; }

        [MaxLength(250)]
        public string Opis { get; set; }

        public virtual List<SpojPosaoUsluga> PosaoUsluga { get; set; }

        public virtual KategorijaUsluga Kategorija { get; set; }
    }
}