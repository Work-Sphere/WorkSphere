namespace UserAuthApi.DTOs
{
    public class LoginResponse
    {
        public string Message { get; set; }
        public int Uid { get; set; }
        public int Rid { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
    }
}
