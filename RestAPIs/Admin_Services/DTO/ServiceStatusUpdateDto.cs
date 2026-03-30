namespace Admin_Services.DTOs
{
    public class ServiceStatusUpdateDto
    {
        public int ServiceId { get; set; }
        public int Status { get; set; }   // 1 = Enabled, 0 = Disabled
    }
}
