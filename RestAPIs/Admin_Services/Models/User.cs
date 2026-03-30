using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Services.Models
{
    [Table("user")]
    public class User
    {
        // ================= BASIC FIELDS =================
        [Key]
        [Column("uid")]
        public int Uid { get; set; }

        [Column("fname")]
        public string? Fname { get; set; }

        [Column("lname")]
        public string? Lname { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("pass")]
        public string? Pass { get; set; }

        [Column("phone")]
        public string? Phone { get; set; }

        [Column("status")]
        public int Status { get; set; }

        [Column("block_active_status")]
        public int BlockActiveStatus { get; set; }

        [Column("state")]
        public int State { get; set; }

        [Column("city")]
        public int City { get; set; }

        [Column("rid")]
        public int Rid { get; set; }

        // ================= NAVIGATION PROPERTIES =================

        // Complaints filed BY this user
        public ICollection<Complaint> ComplaintsFrom { get; set; }
            = new List<Complaint>();

        // Complaints filed AGAINST this user
        public ICollection<Complaint> ComplaintsTo { get; set; }
            = new List<Complaint>();
    }
}
