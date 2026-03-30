//namespace Admin_Services.DTOs
//{
//    public class ComplaintResponseDto
//    {
//        public int ComplaintId { get; set; }
//        public int UserId { get; set; }
//        public int ServiceId { get; set; }
//        public string Description { get; set; }
//        public DateOnly? CreateDate { get; set; }
//    }
//}
namespace Admin_Services.DTOs
{
    public class ComplaintResponseDto
    {
        public int ComplaintId { get; set; }

        public int FreelancerId { get; set; }
        public string FreelancerName { get; set; } = string.Empty;
        public bool IsFreelancerBlocked { get; set; }

        public string ServiceName { get; set; } = string.Empty;

        public string? Description { get; set; }
        public DateOnly? CreateDate { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}

