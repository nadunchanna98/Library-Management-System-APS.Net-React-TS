using System.ComponentModel.DataAnnotations;

namespace Library_Management_System.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }
    }
}
