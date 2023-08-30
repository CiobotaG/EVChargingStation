using BusinessLogicLayer.Interfaces;
using BussinesLogicLayer.Services;
using DataAccesLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationTypeController : ControllerBase
    {
        private readonly IStationTypeService StationTypeService;

        public StationTypeController(IStationTypeService StationTypeService)
        {
            this.StationTypeService = StationTypeService;
        }

        [HttpPost]
        [Route("addStationType")]
        public async Task<IActionResult> AddStationTypeAsync([FromBody] StationType StationType)
        {
            if (StationType == null)
            {
                return BadRequest("Null station type. Please provide a valid station type !");
            }

            if (string.Equals(StationType.Name, "string"))
            {
                return BadRequest("Invalid station type name. Please provide a valid station type name !");
            }

            try
            {
                await StationTypeService.AddStationTypeAsync(StationType);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpPut]
        [Route("updateStationType")]
        public async Task<IActionResult> UpdateStationTypeAsync([FromBody] StationType StationType)
        {
            if (StationType == null)
            {
                return BadRequest("Null station type. Please provide a valid station type !");
            }

            try
            {
                await StationTypeService.UpdateStationTypeAsync(StationType);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpDelete]
        [Route("{StationTypeId}")]
        public async Task<IActionResult> DeleteStationTypeByIdAsync(int StationTypeId)
        {
            if (StationTypeId == 0)
            {
                return BadRequest("Invalid station type id !");
            }

            try
            {
                await StationTypeService.DeleteStationTypeByIdAsync(StationTypeId);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpGet]
        [Route("getAllStationTypes")]
        public async Task<IActionResult> GetAllStationTypesAsync()
        {
            try
            {
                var StationTypes = await StationTypeService.GetAllStationTypesAsync();

                return Ok(StationTypes);
            }
            catch (Exception ex)
            { 
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("{stationtypeId}")]
        public async Task<IActionResult> GetStationTypeByIdAsync(int stationtypeId)
        {
            try
            {
                var stationtype = await StationTypeService.GetStationTypeByIdAsync(stationtypeId);

                if (stationtype == null)
                {
                    return BadRequest($"Could not find any station type for id: '{stationtypeId}'!");
                }

                return Ok(stationtype);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}