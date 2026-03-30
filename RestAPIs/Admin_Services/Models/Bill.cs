using System;
using System.Collections.Generic;

namespace Admin_Services.Models;


public partial class Bill
{
    public int BillId { get; set; }

    public int UserId { get; set; }

    public int ServiceId { get; set; }

    public decimal Amount { get; set; }

    public decimal? Tax { get; set; }

    public decimal TotalAmount { get; set; }

    public DateOnly? BillDate { get; set; }

    public string PaymentMode { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
