using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Services.Models
{
    public partial class RequirementRequest
    {
        // ✅ EXPLICIT PRIMARY KEY (FIXES EF ERROR)
        [Key]
        [Column("request_id")]
        public int RequestId { get; set; }

        [Column("requirement_id")]
        public int RequirementId { get; set; }

        [Column("freelancer_id")]
        public int FreelancerId { get; set; }

        [Column("request_date")]
        public DateOnly? RequestDate { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        // Navigation properties
        public virtual User Freelancer { get; set; } = null!;
        public virtual Requirement Requirement { get; set; } = null!;
    }
}
