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

        // ✅ FIXED HERE
        [Column("gender")]
        public string? Gender { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("pass")]
        public required string Pass { get; set; }

        [Column("phone")]
        public required string Phone { get; set; }

        [Column("status")]
        public int? Status { get; set; }

        [Column("block_active_status")]
        public int BlockActiveStatus { get; set; }

        // ✅ ALSO SHOULD BE NULLABLE (DB reality)
        [Column("addr")]
        public string? Addr { get; set; }

        // ⚠️ These are INT in DB → OK
        [Column("state")]
        public int State { get; set; }

        [Column("city")]
        public int City { get; set; }
    }
}
