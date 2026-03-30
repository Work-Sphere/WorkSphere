using Admin_Services.Models;

public class Rating
{
    public int RatingId { get; set; }

    public int FromUserId { get; set; }
    public User FromUser { get; set; }   // 🔥 REQUIRED

    public int ToUserId { get; set; }
    public User ToUser { get; set; }     // 🔥 REQUIRED

    public int ServiceId { get; set; }
    public Service Service { get; set; } // 🔥 REQUIRED

    public int Rating1 { get; set; }
    public string Review { get; set; }
    public DateTime? RatingDate { get; set; }
}
