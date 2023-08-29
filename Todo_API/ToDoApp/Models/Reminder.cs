using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Models
{
    public class Reminder
    {
        [Key]
        public int ReminderId { get; set; }

        [Required]
        public DateTime ReminderDate { get; set; }

        public bool IsDismissed { get; set; }

        [ForeignKey(nameof(Task))]
        public int TaskId { get; set; }

        //public Tasks ? Task { get; set; }
    }
}
