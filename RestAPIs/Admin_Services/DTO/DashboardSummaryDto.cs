namespace Admin_Services.DTOs
{
    public class DashboardSummaryDto
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int BlockedUsers { get; set; }

        public int TotalFreelancers { get; set; }
        public int TotalClients { get; set; }

        public int TotalServices { get; set; }
        public int TotalComplaints { get; set; }

        public int PendingUsers { get; set; }

        // ✅ NEW (Monthly Activity)
        public int NewUsersThisMonth { get; set; }
        public int ServicesAddedThisMonth { get; set; }
        public int ComplaintsThisMonth { get; set; }
    }
}
