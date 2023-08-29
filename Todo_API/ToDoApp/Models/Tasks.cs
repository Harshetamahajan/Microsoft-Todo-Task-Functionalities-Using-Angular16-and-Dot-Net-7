using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Models
{
    public class Tasks
    {
        [Key]
        public int TaskId { get; set; }

        public DateTime CreationDate{ get; set; }
        [Required]
        public string? Description { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; }
        public bool IsImportant { get; set; }
        public bool IsRepeated { get; set; }

        [Range(1, 365)]
        public int? RepeatFrequency { get; set; } // 1: Daily, 7: Weekly, 30: Monthly, etc.

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        public User ? User  { get; set; }
    }
}
