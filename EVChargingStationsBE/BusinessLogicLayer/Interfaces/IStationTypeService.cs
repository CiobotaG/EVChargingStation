using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccesLayer.Models;
namespace BusinessLogicLayer.Interfaces
{
    public interface IStationTypeService
    {
        Task AddStationTypeAsync(StationType stationType);

        Task UpdateStationTypeAsync(StationType stationType);

        Task DeleteStationTypeByIdAsync(int stationTypeId);

        Task<IEnumerable<StationType>> GetAllStationTypesAsync();
        public Task<StationType> GetStationTypeByIdAsync(int stationtypeId);


    }
}