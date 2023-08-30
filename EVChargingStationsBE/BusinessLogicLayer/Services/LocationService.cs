using BussinesLogicLayer.Dtos;
using BussinesLogicLayer.Interfaces;
using DataAccesLayer.Implementations;
using DataAccesLayer.Interfaces;
using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogicLayer.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository LocationRepository;

        public LocationService(ILocationRepository LocationRepository)
        {
            this.LocationRepository = LocationRepository;
        }

        public async Task AddLocationAsync(Location Location)
        {
           
            await LocationRepository.AddLocationAsync(Location);
        }

        public async Task UpdateLocationAsync(Location Location)
        {
            var Locationupdated = new Location
            {
                LocationId = Location.LocationId,
                Name = Location.Name,
                Latitude = Location.Latitude,
                Longitude = Location.Longitude,
                Country = Location.Country,
                ContactEmail = Location.ContactEmail,
                City = Location.City,
                Address = Location.Address,
                Phone = Location.Phone
            };

            await LocationRepository.UpdateLocationAsync(Locationupdated);
        }

        public async Task DeleteLocationByIdAsync(int LocationId)
        {
            await LocationRepository.DeleteLocationByIdAsync(LocationId);
        }

        public async Task<IEnumerable<Location>> GetAllLocationsAsync()
        {
            var LocationFromDb = await LocationRepository.GetAllLocationsAsync();
            var Locations = new List<Location>();

            foreach (var Location in LocationFromDb)
            {
                Locations.Add(Location);
            }

            return Locations;
        }

        public async Task<Location> GetLocationByIdAsync(int locationId)
        {
            var location = await LocationRepository.GetLocationByIdAsync(locationId);

            if (location == null) return null;

            return location;
        }
    }

}

