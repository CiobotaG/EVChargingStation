using BussinesLogicLayer.Dtos;
using BussinesLogicLayer.Interfaces;
using BussinesLogicLayer.Services;
using DataAccesLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace EVChargingLocationsBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService LocationService;

        public LocationController(ILocationService LocationService)
        {
            this.LocationService = LocationService;
        }

        [HttpPost]
        [Route("addLocation")]
        public async Task<IActionResult> AddLocationAsync([FromBody] Location Location)
        {
            if (Location == null)
            {
                return BadRequest("Null Location. Please provide a valid Location !");
            }

            if (string.Equals(Location.Name, "string"))
            {
                return BadRequest("Invalid Location name. Please provide a valid Location  name !");
            }

            try
            {
                await LocationService.AddLocationAsync(Location);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpPut]
        [Route("updateLocation")]
        public async Task<IActionResult> UpdateLocationAsync([FromBody] Location Location)
        {
            if (Location == null)
            {
                return BadRequest("Null location. Please provide a valid location !");
            }

            try
            {
                await LocationService.UpdateLocationAsync(Location);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpDelete]
        [Route("{LocationId}")]
        public async Task<IActionResult> DeleteLocationByIdAsync(int LocationId)
        {
            if (LocationId == 0)
            {
                return BadRequest("Invalid Location id !");
            }

            try
            {
                await LocationService.DeleteLocationByIdAsync(LocationId);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpGet]
        [Route("getAllLocations")]
        public async Task<IActionResult> GetAllLocationAsync()
        {
            try
            {
                var Locations = await LocationService.GetAllLocationsAsync();

                return Ok(Locations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("{locationId}")]
        public async Task<IActionResult> GetLocationByIdAsync(int locationId)
        {
            try
            {
                var location = await LocationService.GetLocationByIdAsync(locationId);

                if (location == null)
                {
                    return BadRequest($"Could not find any location for id: '{locationId}'!");
                }

                return Ok(location);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
