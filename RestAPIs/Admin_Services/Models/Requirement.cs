using System;
using System.Collections.Generic;

namespace Admin_Services.Models;


public partial class Requirement
{
    public int RequirementId { get; set; }

    public int ClientId { get; set; }

    public int ServiceId { get; set; }

    public string? Description { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public string? Status { get; set; }

    public virtual User Client { get; set; } = null!;

    public virtual ICollection<RequirementRequest> RequirementRequests { get; set; } = new List<RequirementRequest>();

    public virtual Service Service { get; set; } = null!;
}
