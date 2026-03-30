namespace Admin_Services.DTOs
{
    public class UserResponseDto
    {
        public int Uid { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        // 🔹 Approval status (if used elsewhere)
        public int Status { get; set; }

        // 🔹 Block / Active status (NEW – REQUIRED)
        public int BlockActiveStatus { get; set; }

        public int RoleId { get; set; }
    }
}
