using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccesLayer.Models;
namespace BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(User User);

        Task UpdateUserAsync(User User);

        Task DeleteUserByIdAsync(int UserId);

        Task<IEnumerable<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int UserId);

        public Task<User> AuthenticateAsync(string username, string password);
        public Task<User> GetUserByUsernameAsync(string Username);


    }
}