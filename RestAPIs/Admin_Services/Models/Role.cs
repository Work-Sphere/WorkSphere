using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Services.Models
{
    public class Role
    {
        [Key]
        [Column("rid")]
        public int Rid { get; set; }

        [Column("rname")]
        public string Rname { get; set; } = null!;
    }
}
