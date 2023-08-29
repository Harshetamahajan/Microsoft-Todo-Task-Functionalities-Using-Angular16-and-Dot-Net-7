using Microsoft.EntityFrameworkCore;
using ToDoApp.Database;
using ToDoApp.Models;

namespace ToDoApp.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public User GetUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }
    }


}
