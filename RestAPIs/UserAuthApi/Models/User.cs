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
        public string Fname { get; set; }

        [Column("lname")]
        public string? Lname { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("pass")]
        public string Pass { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        // ✅ DB changed: status is int now
        [Column("status")]
        public int? Status { get; set; }

        [Column("addr")]
        public string Addr { get; set; }

        // ✅ DB changed: state is FK INT now
        [Column("state")]
        public int State { get; set; }

        // ✅ DB changed: city is FK INT now
        [Column("city")]
        public int City { get; set; }
    }
}
