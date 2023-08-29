using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;
using ToDoApp.Repository;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    
        public class ReminderController : ControllerBase
        {
            private readonly IRepository<Reminder> _reminderRepository;

            public ReminderController(IRepository<Reminder> reminderRepository)
            {
                _reminderRepository = reminderRepository;
            }

            [HttpGet]
            public IActionResult GetAllReminders()
            {
                var reminders = _reminderRepository.GetAll();
                return Ok(reminders);
            }

            [HttpPost]
            public IActionResult CreateReminder(Reminder reminder)
            {
                _reminderRepository.Add(reminder);
                return CreatedAtAction(nameof(GetReminderById), new { id = reminder.ReminderId }, reminder);
            }

            [HttpGet("{id}")]
            public IActionResult GetReminderById(int id)
            {
                var reminder = _reminderRepository.GetById(id);
                if (reminder == null)
                {
                    return NotFound();
                }
                return Ok(reminder);
            }

            [HttpPut("{id}")]
            public IActionResult UpdateReminder(int id, Reminder reminder)
            {
                if (id != reminder.ReminderId)
                {
                    return BadRequest();
                }

                _reminderRepository.Update(reminder);
                return NoContent();
            }

            [HttpDelete("{id}")]
            public IActionResult DeleteReminder(int id)
            {
                var reminder = _reminderRepository.GetById(id);
                if (reminder == null)
                {
                    return NotFound();
                }

                _reminderRepository.Remove(reminder);
                return NoContent();
            }
        }
    }

