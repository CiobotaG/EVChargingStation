using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccesLayer.Interfaces
{
    public interface IStationRepository
    {
        Task AddStationAsync(Station Station);

        Task UpdateStationAsync(Station Station);

        Task DeleteStationByIdAsync(int StationId);

        Task<IEnumerable<Station>> GetAllStationsAsync();

        Task<Station> GetStationByIdAsync(int StationId);

        Task<List<Station>> GetStationByLocationIdAsync(int LocationId);
    }
}
