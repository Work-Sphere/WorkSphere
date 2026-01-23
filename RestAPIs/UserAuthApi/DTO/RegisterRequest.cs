namespace UserAuthApi.DTOs
{
    public class RegisterRequest
    {
        public int Rid { get; set; }
        public string Fname { get; set; }
        public string? Lname { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public string Phone { get; set; }
        public string Addr { get; set; }

        // ✅ changed to int
        public int State { get; set; }  // state_id
        public int City { get; set; }   // city_id
    }
}
