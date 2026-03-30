namespace Admin_Services.DTOs
{
    public class PasswordResetDto
    {
        public int UserId { get; set; }

        public required string NewPassword { get; set; }
    }
}
