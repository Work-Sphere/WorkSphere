namespace UserAuthApi.DTOs
{
    public class LoginRequest
    {
        public required string Phone { get; set; }
        public required string Pass { get; set; }
    }
}
