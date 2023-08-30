using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IMaintenanceRepository
    {
        Task AddMaintenanceAsync(Maintenance Maintenance);

        Task UpdateMaintenanceAsync(Maintenance Maintenance);

        Task DeleteMaintenanceByIdAsync(int MaintenanceId);

        Task<IEnumerable<Maintenance>> GetAllMaintenancesAsync();

        public Task<Maintenance> GetMaintenanceByIdAsync(int MaintenanceId);
    }
}
