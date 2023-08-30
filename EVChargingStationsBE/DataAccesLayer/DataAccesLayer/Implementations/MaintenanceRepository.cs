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
    public class MaintenanceRepository : IMaintenanceRepository
    {
        public readonly AppDbContext appContext;

        public MaintenanceRepository()
        {
            this.appContext = new AppDbContext();
        }

        public async Task AddMaintenanceAsync(Maintenance Maintenance)
        {
            await appContext.Maintenances.AddAsync(Maintenance);
            await appContext.SaveChangesAsync();
        }

        public async Task UpdateMaintenanceAsync(Maintenance Maintenance)
        {
            appContext.Maintenances.Update(Maintenance);
            await appContext.SaveChangesAsync();
        }

        public async Task DeleteMaintenanceByIdAsync(int MaintenanceId)
        {
            var existingMaintenanceInDb = await GetMaintenanceByIdAsync(MaintenanceId);

            appContext.Maintenances.Remove(existingMaintenanceInDb);
            await appContext.SaveChangesAsync();
        }

        public async Task<Maintenance> GetMaintenanceByIdAsync(int MaintenanceId)
        {
            var Maintenance = await appContext.Maintenances
                .Include(d => d.Station).Include(d => d.Station.Location).Include(d=> d.Station.StationType)
                .FirstOrDefaultAsync(d => d.Id == MaintenanceId);

            return Maintenance;
        }

        public async Task<IEnumerable<Maintenance>> GetAllMaintenancesAsync()
        {
            return await appContext.Maintenances.OrderBy(d => d.LastMaintenanceDate).Include(d=>d.Station).Include(d => d.Station.Location).Include(d => d.Station.StationType).ToListAsync();
        }
    }
}