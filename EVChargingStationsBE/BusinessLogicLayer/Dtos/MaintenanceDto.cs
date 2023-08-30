using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Dtos
{
    public class MaintenanceDto
    {
        public int Id { get; set; }
        public Station Station { get; set; }
        public string? Description { get; set; }
        public string? Outcome { get; set; }
        public string Status { get; set; }
        public DateTime LastMaintenanceDate { get; set; }
        public DateTime NextMaintenanceDate { get; set; }
    }
}
