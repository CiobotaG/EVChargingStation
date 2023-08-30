using BussinesLogicLayer.Dtos;
using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Interfaces
{
    public interface IStationService
    {
        Task AddStationAsync(StationDto station);

        Task UpdateStationAsync(StationDto station);

        Task DeleteStationByIdAsync(int station);

        Task<IEnumerable<Station>> GetAllStationsAsync();
        Task<Station> GetStationByIdAsync(int stationeId);

        Task<List<Station>> GetStationsByLocationIdAsync(int Id);

    }
}
