using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IStationTypeRepository
    {
        Task AddStationTypeAsync(StationType StationType);

        Task UpdateStationTypeAsync(StationType StationType);

        Task DeleteStationTypeByIdAsync(int StationTypeId);

        Task<IEnumerable<StationType>> GetAllStationTypesAsync();

        public Task<StationType> GetStationTypeByIdAsync(int StationTypeId);
    }
}
