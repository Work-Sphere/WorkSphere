using System;
using System.Collections.Generic;

namespace Admin_Services.Models;

public partial class UserService
{
    public int UserServiceId { get; set; }

    public int UserId { get; set; }

    public int ServiceId { get; set; }

    public decimal CustomPrice { get; set; }

    public string? Experience { get; set; }

    public string? Details { get; set; }

    public string? Status { get; set; }

    public virtual Service Service { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
