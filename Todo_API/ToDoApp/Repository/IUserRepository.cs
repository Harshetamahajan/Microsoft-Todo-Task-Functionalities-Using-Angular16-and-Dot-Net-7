using ToDoApp.Models;

namespace ToDoApp.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUserByUsername(string username);
    }
}
