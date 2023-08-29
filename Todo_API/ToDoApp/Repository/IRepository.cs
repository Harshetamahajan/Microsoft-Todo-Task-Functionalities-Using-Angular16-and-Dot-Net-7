using System.Linq.Expressions;
using ToDoApp.Models;

namespace ToDoApp.Repository
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        public List<Tasks> GetTasksByUserId(int userId);
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        void Add(T entity);

        void Update(T entity);
        void Remove(T entity);
    }


    public interface IReminderRepository : IRepository<Reminder>
    {
        // Additional reminder-specific methods, if needed
    }

}
