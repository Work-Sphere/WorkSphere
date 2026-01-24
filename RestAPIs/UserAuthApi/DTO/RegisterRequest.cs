namespace UserAuthApi.DTOs
{
    public class RegisterRequest
    {
        public int Rid { get; set; }
        public required string Fname { get; set; }

        public string? Lname { get; set; }

        public required string Email { get; set; }

        public required string Pass { get; set; }

        public required string Phone { get; set; }

        public required string Addr { get; set; }

        public int State { get; set; }  // state_id
        public int City { get; set; }   // city_id
    }
}
