using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserAuthApi.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column("uid")]
        public int Uid { get; set; }

        [Column("rid")]
        public int Rid { get; set; }

        [Column("fname")]
        public required string Fname { get; set; }

        [Column("lname")]
        public string? Lname { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("pass")]
        public required string Pass { get; set; }

        [Column("phone")]
        public required string Phone { get; set; }

        [Column("status")]
        public int? Status { get; set; }

        [Column("addr")]
        public required string Addr { get; set; }

        [Column("state")]
        public int State { get; set; }

        [Column("city")]
        public int City { get; set; }
    }
}
