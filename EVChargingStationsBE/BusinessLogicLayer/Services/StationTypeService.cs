using BusinessLogicLayer.Interfaces;
using DataAccesLayer.Implementations;
using DataAccesLayer.Models;
using DataAccessLayer.Implementation;
using DataAccessLayer.Interfaces;

namespace BusinessLogicLayer.Services
{
    public class StationTypeService : IStationTypeService
    {
        private readonly IStationTypeRepository StationTypeRepository;

        public StationTypeService(IStationTypeRepository StationTypeRepository)
        {
            this.StationTypeRepository = StationTypeRepository;
        }

        public async Task AddStationTypeAsync(StationType StationTypeDto)
        {
            var StationType = new StationType
            {
                Name = StationTypeDto.Name
            };

            await StationTypeRepository.AddStationTypeAsync(StationType);
        }

        public async Task UpdateStationTypeAsync(StationType StationType)
        {
            var stationType = new StationType
            {
                Id = StationType.Id,
                Name = StationType.Name
            };

            await StationTypeRepository.UpdateStationTypeAsync(stationType);
        }

        public async Task DeleteStationTypeByIdAsync(int StationTypeId)
        {
            await StationTypeRepository.DeleteStationTypeByIdAsync(StationTypeId);
        }

        public async Task<IEnumerable<StationType>> GetAllStationTypesAsync()
        {
            var StationTypeFromDb = await StationTypeRepository.GetAllStationTypesAsync();
            var StationTypes = new List<StationType>();

            foreach (var StationType in StationTypeFromDb)
            { 
                StationTypes.Add(StationType);
            }

            return StationTypes;
        }

        public async Task<StationType> GetStationTypeByIdAsync(int stationtypeId)
        {
            var stationtype = await StationTypeRepository.GetStationTypeByIdAsync(stationtypeId);

            if (stationtype == null) return null;

            return stationtype;
        }
    }
}