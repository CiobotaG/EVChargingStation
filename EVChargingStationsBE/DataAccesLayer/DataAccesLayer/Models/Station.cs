﻿

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataAccesLayer.Models
{
    public class Station
    {
       
        public int StationId { get; set; }

        public string SerialNumber { get; set; }

        public string Name { get; set; }

        public string? SoftwareVersion { get; set; }

        public string? Description { get; set; }

        public int LocationId { get; set; }

        public Location Location { get; set; }

        public int StationTypeId { get; set; }

        public StationType StationType { get; set; }

        public string? Emails { get; set; }

    }
}
