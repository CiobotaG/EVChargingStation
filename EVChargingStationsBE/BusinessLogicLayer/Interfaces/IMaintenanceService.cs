using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BussinesLogicLayer.Dtos;
using DataAccesLayer.Models;
namespace BusinessLogicLayer.Interfaces
{
    public interface IMaintenanceService
    {
        Task AddMaintenanceAsync(MaintenanceDto Maintenance);

        Task UpdateMaintenanceAsync(MaintenanceDto Maintenance);

        Task DeleteMaintenanceByIdAsync(int MaintenanceId);

        Task<IEnumerable<Maintenance>> GetAllMaintenancesAsync();
        public Task<Maintenance> GetMaintenanceByIdAsync(int MaintenanceId);


    }
}