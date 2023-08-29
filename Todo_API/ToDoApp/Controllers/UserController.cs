using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;
using ToDoApp.Repository;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("signup")]
        public IActionResult SignUp(User user)
        {
            // Check if the username already exists
            var existingUser = _userRepository.GetUserByUsername(user.Username);
            if (existingUser != null)
            {
                return Conflict("Username already exists.");
            }

            // TODO: Hash the password before saving
            // You should use a secure password hashing mechanism (e.g., bcrypt)
            // user.Password = HashPassword(user.Password);

            _userRepository.Add(user);

            // Return a response with the location of the newly created user's details
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existingUser = _userRepository.GetUserByUsername(user.Username);
            if (existingUser == null || existingUser.Password != user.Password)
            {
                return Unauthorized();
            }

            return Ok(existingUser);
        }

        // ... Other methods ...

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
