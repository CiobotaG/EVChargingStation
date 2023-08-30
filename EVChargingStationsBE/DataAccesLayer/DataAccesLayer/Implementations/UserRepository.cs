using DataAccesLayer;
using DataAccesLayer.Models;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace DataAccessLayer.Implementation
{
    public class UserRepository : IUserRepository
    {
        public readonly AppDbContext appContext;

        public UserRepository()
        {
            this.appContext = new AppDbContext();
        }

        public async Task AddUserAsync(User User)
        {
            await appContext.Users.AddAsync(User);
            await appContext.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User User)
        {
            appContext.Users.Update(User);
            await appContext.SaveChangesAsync();
        }

        public async Task DeleteUserByIdAsync(int UserId)
        {
            var existingUserInDb = await GetUserByIdAsync(UserId);

            appContext.Users.Remove(existingUserInDb);
            await appContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByIdAsync(int UserId)
        {
            var User = await appContext.Users
                .Where(d => d.Id == UserId)
                .FirstOrDefaultAsync();

            return User;
        }


        public async Task<User> GetUserByUsernameAsync(string Username)
        {
            var User = await appContext.Users
                .Where(d => d.Username == Username)
                .FirstOrDefaultAsync();

            return User;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await appContext.Users.OrderBy(d => d.Username).ToListAsync();
        }

        public async Task<User> FindByNameAsync(string username)
        {
            var user = await appContext.Users.Where(u => u.Username == username).FirstOrDefaultAsync();
            return user;
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            var passwordHasher = new PasswordHasher<User>();
            var verify = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password) == PasswordVerificationResult.Success;
            return verify;
        }



    }
}