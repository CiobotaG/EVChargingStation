using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using BussinesLogicLayer.Services;
using DataAccesLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService UserService;

        public UserController(IUserService UserService)
        {
            this.UserService = UserService;
        }

        [HttpPost]
        [Route("addUser")]
        public async Task<IActionResult> AddUserAsync([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Null user, please provide a valid user!");
            }

            if (string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Invalid username, please provide a valid username!");
            }

            try
            {
                var existingUser = await UserService.GetUserByUsernameAsync(user.Username);
                if (existingUser != null)
                {
                    return Conflict("Username already exists, please choose a different username!");
                }

                await UserService.AddUserAsync(user);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPut]
        [Route("updateUser")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] User User)
        {
            if (User == null)
            {
                return BadRequest("Null station type. Please provide a valid station type !");
            }

            try
            {
                await UserService.UpdateUserAsync(User);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpDelete]
        [Route("{UserId}")]
        public async Task<IActionResult> DeleteUserByIdAsync(int UserId)
        {
            if (UserId == 0)
            {
                return BadRequest("Invalid user id !");
            }

            try
            {
                await UserService.DeleteUserByIdAsync(UserId);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }
        }

        [HttpGet]
        [Route("getAllUsers")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var Users = await UserService.GetAllUsersAsync();

                return Ok(Users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("{UserId}")]
        public async Task<IActionResult> GetUserByIdAsync(int UserId)
        {
            try
            {
                var User = await UserService.GetUserByIdAsync(UserId);

                if (User == null)
                {
                    return BadRequest($"Could not find any user for id: '{UserId}'!");
                }

                return Ok(User);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("getUserByName/{username}")]
        public async Task<IActionResult> GetUserByUsernameAsync(string username)
        {
            try
            {
                var User = await UserService.GetUserByUsernameAsync(username);

                if (User == null)
                {
                    return BadRequest($"Could not find any user");
                }

                return Ok(User);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] User credentials)
        {
            
            var user = await UserService.AuthenticateAsync(credentials.Username, credentials.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password");
                
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("your_secret_key_here");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(tokenString);
        }

    }
}
