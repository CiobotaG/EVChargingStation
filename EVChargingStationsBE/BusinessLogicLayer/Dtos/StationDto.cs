using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Dtos
{
    public class StationDto
    {
        public int StationId { get; set; }
        public string SerialNumber { get; set; }

        public string Name { get; set; }

        public Location Location { get; set; }

        public StationType StationType { get; set; }

      
    }
}
