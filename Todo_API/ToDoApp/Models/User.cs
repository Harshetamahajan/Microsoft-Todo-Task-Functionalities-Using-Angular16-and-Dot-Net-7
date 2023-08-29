using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Username { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$",
            ErrorMessage = "Password must contain at least 8 characters including uppercase, lowercase, digit, and special character.")]
        public string? Password { get; set; }

        // Other user properties

        
        [InverseProperty(nameof(Models.Tasks.User))]
        public ICollection<Tasks>? Tasks { get; set; }

       
        public ICollection<Reminder>? Reminders { get; set; }
    }
}
