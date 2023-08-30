using DataAccesLayer.Interfaces;
using DataAccesLayer.Models;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccesLayer.Implementations
{
    public class StationRepository : IStationRepository
    {
        public readonly AppDbContext appContext;

        public StationRepository()
        {
            this.appContext = new AppDbContext();
        } 
        public async Task UpdateStationAsync(Station station)
        {
          
            appContext.Stations.Update(station);
            await appContext.SaveChangesAsync(); 
        }

        public async Task AddStationAsync(Station Station)
        {
            await appContext.Stations.AddAsync(Station);
            await appContext.SaveChangesAsync();
        }

        public async Task DeleteStationByIdAsync(int StationId)
        {
            var existingStationInDb = await GetStationByIdAsync(StationId);

            appContext.Stations.Remove(existingStationInDb);
            await appContext.SaveChangesAsync();
        }

        public async Task<Station> GetStationByIdAsync(int StationId)
        {
            var Station= await appContext.Stations
                .Where(d => d.StationId == StationId).Include(s=> s.Location).Include(s=>s.StationType)
                .FirstOrDefaultAsync();

            return Station;
        }

        public async Task<List<Station>> GetStationByLocationIdAsync(int LocationId)
        {
            var Station = await appContext.Stations
                .Where(d => d.LocationId == LocationId).Include(s => s.Location).Include(s => s.StationType)
                .ToListAsync();

            return Station;
        }

        public async Task<IEnumerable<Station>> GetAllStationsAsync()
        {
            return await appContext.Stations.OrderBy(d => d.Name).Include(s => s.Location)
                    .Include(s => s.StationType).ToListAsync();
        }
    }
}
