using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;
using ToDoApp.Repository;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IRepository<Tasks> _taskRepository;
        private readonly IRepository<User> _userRepository;

        public TaskController(IRepository<Tasks> tasksRepository, IRepository<User> userRepository)
        {
            _taskRepository = tasksRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _taskRepository.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult CreateTask(Tasks tasks)
        {
            _taskRepository.Add(tasks);
            return CreatedAtAction(nameof(GetTaskById), new { id = tasks.TaskId }, tasks);
        }

        [HttpGet("{id}")]
        public IActionResult GetTaskById(int id)
        {
            var tasks = _taskRepository.GetById(id);
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, Tasks tasks)
        {
            if (id != tasks.TaskId)
            {
                return BadRequest();
            }

            _taskRepository.Update(tasks);
            return NoContent();
        }

        // GET: api/task/user/{userId}
        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<Tasks>> GetTasksByUserId(int userId)
        {
            try
            {
                var tasks = _taskRepository.GetTasksByUserId(userId);

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                // Log the error and return an error response
                return StatusCode(500, "An error occurred while fetching tasks.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var tasks = _taskRepository.GetById(id);
            if (tasks == null)
            {
                return NotFound();
            }

            _taskRepository.Remove(tasks);

            return NoContent();
        }
    }
}
