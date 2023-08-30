using BussinesLogicLayer.Dtos;
using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Interfaces
{
    public interface ILocationService
    {
        Task AddLocationAsync(Location Location);

        Task UpdateLocationAsync(Location Location);

        Task DeleteLocationByIdAsync(int Location);

        Task<IEnumerable<Location>> GetAllLocationsAsync();

        public Task<Location> GetLocationByIdAsync(int locationId);
    }
}
