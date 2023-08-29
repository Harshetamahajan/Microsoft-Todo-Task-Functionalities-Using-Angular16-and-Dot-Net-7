using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ToDoApp.Database;
using ToDoApp.Models;

namespace ToDoApp.Repository
{
  

    public class ReminderRepository : IReminderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Reminder> _dbSet;

        public ReminderRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Reminder>();
        }

        public Reminder GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public IEnumerable<Reminder> GetAll()
        {
            return _dbSet.ToList();
        }

        public IEnumerable<Reminder> Find(Expression<Func<Reminder, bool>> predicate)
        {
            return _dbSet.Where(predicate);
        }

        public void Add(Reminder entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(Reminder entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Remove(Reminder entity)
        {
            _dbSet.Remove(entity);
        }

        public List<Tasks> GetTasksByUserId(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
