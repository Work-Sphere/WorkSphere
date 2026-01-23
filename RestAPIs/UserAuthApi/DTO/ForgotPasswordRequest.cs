namespace UserAuthApi.DTOs
{
    public class ForgotPasswordRequest
    {
        public required string Phone { get; set; }
        public required string NewPass { get; set; }
    }
}
