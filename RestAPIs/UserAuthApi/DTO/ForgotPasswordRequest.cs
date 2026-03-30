namespace UserAuthApi.DTOs
{
    public class ForgotPasswordRequest
    {
        public string Phone { get; set; }
        public string NewPassword { get; set; }
    }
}
