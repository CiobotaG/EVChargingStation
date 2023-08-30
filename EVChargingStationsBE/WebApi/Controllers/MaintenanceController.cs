using BusinessLogicLayer.Interfaces;
using BussinesLogicLayer.Dtos;
using BussinesLogicLayer.Services;
using DataAccesLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceController : ControllerBase
    {
        private readonly IMaintenanceService MaintenanceService;

        public MaintenanceController(IMaintenanceService MaintenanceService)
        {
            this.MaintenanceService = MaintenanceService;
        }

        [HttpPost]
        [Route("addMaintenance")]
        public async Task<IActionResult> AddMaintenanceAsync([FromBody] MaintenanceDto Maintenance)
        {
            if (Maintenance == null)
            {
                return BadRequest("Null Maintenance, Please provide a valid Maintenance !");
            }

            try
            {
                await MaintenanceService.AddMaintenanceAsync(Maintenance);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpPut]
        [Route("updateMaintenance")]
        public async Task<IActionResult> UpdateMaintenanceAsync([FromBody] MaintenanceDto Maintenance)
        {
            if (Maintenance == null)
            {
                return BadRequest("Null maintenance. Please provide a valid maintenance !");
            }

            try
            {
                await MaintenanceService.UpdateMaintenanceAsync(Maintenance);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpDelete]
        [Route("{MaintenanceId}")]
        public async Task<IActionResult> DeleteMaintenanceByIdAsync(int MaintenanceId)
        {
            if (MaintenanceId == 0)
            {
                return BadRequest("Invalid maintenance id !");
            }

            try
            {
                await MaintenanceService.DeleteMaintenanceByIdAsync(MaintenanceId);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpGet]
        [Route("getAllMaintenances")]
        public async Task<IActionResult> GetAllMaintenancesAsync()
        {
            try
            {
                var Maintenances = await MaintenanceService.GetAllMaintenancesAsync();

                return Ok(Maintenances);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("{MaintenanceId}")]
        public async Task<IActionResult> GetMaintenanceByIdAsync(int MaintenanceId)
        {
            try
            {
                var Maintenance = await MaintenanceService.GetMaintenanceByIdAsync(MaintenanceId);

                if (Maintenance == null)
                {
                    return BadRequest($"Could not find any maintenance for id: '{MaintenanceId}'!");
                }

                return Ok(Maintenance);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}