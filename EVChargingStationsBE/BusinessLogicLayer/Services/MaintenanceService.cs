using BusinessLogicLayer.Interfaces;
using BussinesLogicLayer.Dtos;
using DataAccesLayer.Implementations;
using DataAccesLayer.Models;
using DataAccessLayer.Implementation;
using DataAccessLayer.Interfaces;

namespace BusinessLogicLayer.Services
{
    public class MaintenanceService : IMaintenanceService
    {
        private readonly IMaintenanceRepository MaintenanceRepository;

        public MaintenanceService(IMaintenanceRepository MaintenanceRepository)
        {
            this.MaintenanceRepository = MaintenanceRepository;
        }

        public async Task AddMaintenanceAsync(MaintenanceDto MaintenanceDto)
        {
            var Maintenance = new Maintenance
            {
                Id = MaintenanceDto.Id,
                StationId = MaintenanceDto.Station.StationId,
                Description =MaintenanceDto.Description,
                Outcome =MaintenanceDto.Outcome,
                Status = MaintenanceDto.Status,
                LastMaintenanceDate = MaintenanceDto.LastMaintenanceDate,
                NextMaintenanceDate = MaintenanceDto.NextMaintenanceDate
            };

            await MaintenanceRepository.AddMaintenanceAsync(Maintenance);
        }

        public async Task UpdateMaintenanceAsync(MaintenanceDto MaintenanceDto)
        {
            var MaintenanceUpdated = new Maintenance
            {   Id= MaintenanceDto.Id,
                StationId = MaintenanceDto.Station.StationId,
                Description = MaintenanceDto.Description,
                Outcome = MaintenanceDto.Outcome,
                Status = MaintenanceDto.Status,
                LastMaintenanceDate = MaintenanceDto.LastMaintenanceDate,
                NextMaintenanceDate = MaintenanceDto.NextMaintenanceDate

            };

            await MaintenanceRepository.UpdateMaintenanceAsync(MaintenanceUpdated);
        }

        public async Task DeleteMaintenanceByIdAsync(int MaintenanceId)
        {
            await MaintenanceRepository.DeleteMaintenanceByIdAsync(MaintenanceId);
        }

        public async Task<IEnumerable<Maintenance>> GetAllMaintenancesAsync()
        {
            var MaintenanceFromDb = await MaintenanceRepository.GetAllMaintenancesAsync();
            var Maintenances = new List<Maintenance>();

            foreach (var Maintenance in MaintenanceFromDb)
            {
                Maintenances.Add(Maintenance);
            }

            return Maintenances;
        }

        public async Task<Maintenance> GetMaintenanceByIdAsync(int MaintenanceId)
        {
            var Maintenance = await MaintenanceRepository.GetMaintenanceByIdAsync(MaintenanceId);

            if (Maintenance == null) return null;

            return Maintenance;
        }
    }
}