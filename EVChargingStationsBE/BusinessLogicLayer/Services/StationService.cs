using BusinessLogicLayer.Interfaces;
using BussinesLogicLayer.Dtos;
using BussinesLogicLayer.Interfaces;
using DataAccesLayer.Interfaces;
using DataAccesLayer.Models;
using DataAccessLayer.Implementation;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Services
{
    public class StationService : IStationService
    {
        private readonly IStationRepository StationRepository;

        public StationService(IStationRepository StationRepository)
        {
            this.StationRepository = StationRepository;
        }

        public async Task AddStationAsync(StationDto StationDto)
        {
            var Station = new Station();
            {


                Station.StationTypeId = StationDto.StationType.Id;
                Station.LocationId = StationDto.Location.LocationId;
                Station.SerialNumber = StationDto.SerialNumber;
                Station.Name = StationDto.Name;

            }
            await StationRepository.AddStationAsync(Station);
        }

        public async Task UpdateStationAsync(StationDto Station)
        {
            var stationupdated = new Station
            {
                StationId= Station.StationId,
                Name = Station.Name,
                SerialNumber = Station.SerialNumber,
                Location = Station.Location,
                StationType = Station.StationType,
            };

            await StationRepository.UpdateStationAsync(stationupdated);
        }

        public async Task DeleteStationByIdAsync(int StationId)
        {
            await StationRepository.DeleteStationByIdAsync(StationId);
        }

        public async Task<IEnumerable<Station>> GetAllStationsAsync()
        {
            var StationFromDb = await StationRepository.GetAllStationsAsync();
            var Stations = new List<Station>();

            foreach (var Station in StationFromDb)
            {
                Stations.Add(Station);
            }

            return Stations;
        }

        public async Task<Station> GetStationByIdAsync(int stationeId)
        {
            var station= await StationRepository.GetStationByIdAsync(stationeId);

            if (station== null) return null;

            return station;
        }

        public async Task<List<Station>> GetStationsByLocationIdAsync(int Id)
        {
            var stations = await StationRepository.GetStationByLocationIdAsync(Id);

            if (stations == null) return null;

            return stations;
        }
    }
}
