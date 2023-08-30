using DataAccesLayer;
using DataAccesLayer.Models;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace DataAccessLayer.Implementation
{
    public class StationTypeRepository : IStationTypeRepository
    {
        public readonly AppDbContext appContext;

        public StationTypeRepository()
        {
            this.appContext = new AppDbContext();
        }

        public async Task AddStationTypeAsync(StationType StationType)
        {
            await appContext.StationTypes.AddAsync(StationType);
            await appContext.SaveChangesAsync();
        }

        public async Task UpdateStationTypeAsync(StationType StationType)
        {
            appContext.StationTypes.Update(StationType);
            await appContext.SaveChangesAsync();
        }

        public async Task DeleteStationTypeByIdAsync(int StationTypeId)
        {
            var existingStationTypeInDb = await GetStationTypeByIdAsync(StationTypeId);

            appContext.StationTypes.Remove(existingStationTypeInDb);
            await appContext.SaveChangesAsync();
        }

        public async Task<StationType> GetStationTypeByIdAsync(int StationTypeId)
        {
            var StationType = await appContext.StationTypes
                .Where(d => d.Id == StationTypeId)
                .FirstOrDefaultAsync();

            return StationType;
        }

        public async Task<IEnumerable<StationType>> GetAllStationTypesAsync()
        {
            return await appContext.StationTypes.OrderBy(d => d.Name).ToListAsync();
        }
    }
}