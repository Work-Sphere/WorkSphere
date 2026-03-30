
//namespace Admin_Services.DTOs
//{
//    public class RatingResponseDto
//    {
//        public int RatingId { get; set; }

//        // IDs
//        public int FromUserId { get; set; }
//        public int FreelancerId { get; set; }
//        public int ServiceId { get; set; }

//        // DISPLAY DATA
//        public string FromUserName { get; set; }
//        public string FreelancerName { get; set; }
//        public string ServiceName { get; set; }

//        public int Rating { get; set; }
//        public string Review { get; set; }
//        public DateOnly? RatingDate { get; set; }
//    }
//}
namespace Admin_Services.DTOs
{
    public class RatingResponseDto
    {
        public int RatingId { get; set; }

        public int FromUserId { get; set; }
        public int FreelancerId { get; set; }
        public int ServiceId { get; set; }

        public required string FromUserName { get; set; }
        public required string FreelancerName { get; set; }
        public required string ServiceName { get; set; }

        public int Rating { get; set; }
        public string? Review { get; set; }

        // ✅ FIXED
        public DateOnly? RatingDate { get; set; }
    }
}
