using DataAccesLayer.Interfaces;
using DataAccesLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace DataAccesLayer.Implementations
{
    public class LocationRepository : ILocationRepository
    {
        public readonly AppDbContext appContext;

        public LocationRepository()
        {
            this.appContext = new AppDbContext();
        }

        public async Task AddLocationAsync(Location Location)
        {
            await appContext.Locations.AddAsync(Location);
            await appContext.SaveChangesAsync();
        }

        public async Task UpdateLocationAsync(Location Location)
        {
            appContext.Locations.Update(Location);
            await appContext.SaveChangesAsync();
        }

        public async Task DeleteLocationByIdAsync(int LocationId)
        {
            var existingLocationInDb = await GetLocationByIdAsync(LocationId);

            appContext.Locations.Remove(existingLocationInDb);
            await appContext.SaveChangesAsync();
        }

        public async Task<Location> GetLocationByIdAsync(int LocationId)
        {
            var Location = await appContext.Locations
                .Where(d => d.LocationId == LocationId)
                .FirstOrDefaultAsync();

            return Location;
        }

        public async Task<IEnumerable<Location>> GetAllLocationsAsync()
        {
            return await appContext.Locations.OrderBy(d => d.Name).ToListAsync();
        }
    }
}
