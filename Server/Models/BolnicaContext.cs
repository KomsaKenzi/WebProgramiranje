using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class BolnicaContext : DbContext
    {

        public DbSet<Bolnica> Bolnice { get; set; }

        public DbSet<Veterinar> Veterinari { get; set; }

        public DbSet<Usluga> Usluge { get; set; }

        public DbSet<Sala> Sale { get; set; }

        public DbSet<Posao> Poslovi { get; set; }

        public DbSet<SpojPosaoUsluga> PosloviUsluge { get; set; }

        public DbSet<KategorijaUsluga> Kategorije { get; set; }

        public BolnicaContext(DbContextOptions options) : base(options)
        {

        }
    }
}