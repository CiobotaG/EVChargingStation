using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using BussinesLogicLayer.Dtos;
using BussinesLogicLayer.Interfaces;
using DataAccesLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace EVChargingStationsBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationController : ControllerBase
    {
        private readonly IStationService StationService;

        public StationController(IStationService StationService)
        {
            this.StationService = StationService;
        }

        [HttpPost]
        [Route("addStation")]
        public async Task<IActionResult> AddStationAsync([FromBody] StationDto StationDto)
        {  
            if (StationDto == null)
            {
                return BadRequest("Null station. Please provide a valid station !");
            }

            if (string.Equals(StationDto.Name, "string"))
            {
                return BadRequest("Invalid station name. Please provide a valid station  name !");
            }

            try
            {
                await StationService.AddStationAsync(StationDto);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpPut]
        [Route("updateStation")]
        public async Task<IActionResult> UpdateStationAsync([FromBody] StationDto StationDto)
        {
            if (StationDto == null)
            {
                return BadRequest("Null station. Please provide a valid station !");
            }

            try
            {
                await StationService.UpdateStationAsync(StationDto);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpDelete]
        [Route("{StationId}")]
        public async Task<IActionResult> DeleteStationByIdAsync(int StationId)
        {
            if (StationId == 0)
            {
                return BadRequest("Invalid station id !");
            }

            try
            {
                await StationService.DeleteStationByIdAsync(StationId);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpGet]
        [Route("getAllStations")]
        public async Task<IActionResult> GetAllStationAsync()
        {
            try
            {
                var Stations = await StationService.GetAllStationsAsync();

                return Ok(Stations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("{stationId}")]
        public async Task<IActionResult> GetStationyIdAsync(int stationId)
        {
            try
            {
                var station = await StationService.GetStationByIdAsync(stationId);

                if (station== null)
                {
                    return BadRequest($"Not existent ");
                }

                return Ok(station);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        [Route("getStationByLocationId/{Id}")]
        public async Task<IActionResult> GetStationsByLocationIdAsync(int Id)
        {
            try
            {
                var stations = await StationService.GetStationsByLocationIdAsync(Id);
                
                if (stations == null)
                {
                    return BadRequest($"Not existent ");
                }

                return Ok(stations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
