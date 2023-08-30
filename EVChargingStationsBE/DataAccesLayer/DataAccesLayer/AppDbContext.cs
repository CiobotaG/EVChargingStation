using DataAccesLayer.Models;
using Microsoft.EntityFrameworkCore;


namespace DataAccesLayer
{
    public class AppDbContext : DbContext
    {
        public DbSet<Station> Stations { get; set; }

        public DbSet<StationType> StationTypes { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Maintenance> Maintenances { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer($"Server=DESKTOP-HK93UIL\\LOCALHOST1; Database=ChargingStationsDB; Trusted_Connection=True; TrustServerCertificate=True; \r\n");
    }
}
