using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Veterinar
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }

        [MaxLength(50)]
        public string Nadimak { get; set; }

        [Range(0, 100000)]
        public int Plata { get; set; }

        public virtual List<Posao> PosaoVeterinar { get; set; }

        public virtual Bolnica Bolnica { get; set; }


    }
}