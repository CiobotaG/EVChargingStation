using DataAccesLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository
    {
        Task AddUserAsync(User User);

        Task UpdateUserAsync(User User);

        Task DeleteUserByIdAsync(int UserId);

        Task<IEnumerable<User>> GetAllUsersAsync();

        public Task<User> GetUserByIdAsync(int UserId);

        public  Task<User> FindByNameAsync(string username);

        public Task<User> GetUserByUsernameAsync(string Username);
        public Task<bool> CheckPasswordAsync(User user, string password);
    }
}
