using BusinessLogicLayer.Interfaces;
using DataAccesLayer.Implementations;
using DataAccesLayer.Models;
using DataAccessLayer.Implementation;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository UserRepository;

        public UserService(IUserRepository UserRepository)
        {
            this.UserRepository = UserRepository;
        }

        public async Task AddUserAsync(User UserDto)
        {
            var User = new User
            {
                Username = UserDto.Username,
                IsActive = UserDto.IsActive,
                PasswordHash = HashPassword(UserDto.Password),
                Role = UserDto.Role,
                NotificationsCount = UserDto.NotificationsCount
            };

            await UserRepository.AddUserAsync(User);
        }

        public async Task UpdateUserAsync(User User)
        {
            var UserUpdated = new User
            {
                Id = User.Id,
                Username = User.Username,
                IsActive = User.IsActive,
                Role = User.Role,
                PasswordHash = HashPassword(User.Password),
                NotificationsCount = User.NotificationsCount,
            };

            await UserRepository.UpdateUserAsync(UserUpdated);
        }

        public async Task DeleteUserByIdAsync(int UserId)
        {
            await UserRepository.DeleteUserByIdAsync(UserId);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var UserFromDb = await UserRepository.GetAllUsersAsync();
            var Users = new List<User>();

            foreach (var User in UserFromDb)
            {
                Users.Add(User);
            }

            return Users;
        }

        public async Task<User> GetUserByIdAsync(int UserId)
        {
            var User = await UserRepository.GetUserByIdAsync(UserId);

            if (User == null) return null;

            return User;
        }

        public async Task<User> GetUserByUsernameAsync(string Username)
        {
            var User = await UserRepository.GetUserByUsernameAsync(Username);

            if (User == null) return null;

            return User;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {
            var user = await UserRepository.FindByNameAsync(username);
            if (user != null && await UserRepository.CheckPasswordAsync(user, password))
            {
                return user;
            }
            return null;
        }

        private string HashPassword(string password)
        {
            var passwordHasher = new PasswordHasher<User>();
            return passwordHasher.HashPassword(null, password);
        }

    }
}
