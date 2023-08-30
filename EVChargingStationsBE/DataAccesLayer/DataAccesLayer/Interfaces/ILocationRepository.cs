using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccesLayer.Interfaces
{
    public interface ILocationRepository
    {
        Task AddLocationAsync(Location Location);

        Task UpdateLocationAsync(Location Location);

        Task DeleteLocationByIdAsync(int LocationId);

        Task<IEnumerable<Location>> GetAllLocationsAsync();

        public Task<Location> GetLocationByIdAsync(int locationId);
    }
}
