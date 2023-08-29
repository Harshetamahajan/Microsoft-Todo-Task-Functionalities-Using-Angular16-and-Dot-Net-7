using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Models
{

    public class Admin
    {
        [Key]
        public int AdminId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ? AdminUsername  { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$",
            ErrorMessage = "Password must contain at least 8 characters including uppercase, lowercase, digit, and special character.")]
        public string? AdminPassword { get; set; }

        // Other admin properties
    }
}
