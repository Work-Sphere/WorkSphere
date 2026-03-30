using System;

namespace Admin_Services.Models
{
    public partial class Complaint
    {
        public int ComplaintId { get; set; }

        // ================= FOREIGN KEYS =================
        public int FromUserId { get; set; }   // Client
        public int ToUserId { get; set; }     // Freelancer
        public int ServiceId { get; set; }

        // ================= DATA =================
        public string? Description { get; set; }
        public DateOnly? CreateDate { get; set; }
        public string Status { get; set; } = string.Empty;

        // ================= NAVIGATION =================
        public User FromUser { get; set; } = null!;
        public User ToUser { get; set; } = null!;
        public Service Service { get; set; } = null!;
    }
}
