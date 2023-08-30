using DataAccesLayer.Models;

namespace DataAccesLayer.Models
{
    public class Maintenance
    {
        public int Id { get; set; }
        public Station Station { get; set; }
        public int StationId { get; set; }
        public string? Description { get; set; }
        public string? Outcome { get; set; }
        public string Status { get; set; }
        public DateTime LastMaintenanceDate { get; set; }
        public DateTime NextMaintenanceDate { get; set; }
    }
}