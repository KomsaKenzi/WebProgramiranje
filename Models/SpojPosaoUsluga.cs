using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class SpojPosaoUsluga
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public virtual Usluga Usluga { get; set; }

        [Required]
        public virtual Posao Posao { get; set; }
    }
}