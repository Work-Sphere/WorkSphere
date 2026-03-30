using Admin_Services.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/dashboard")]
    [Authorize(Roles = "ADMIN")]
    public class DashboardController : ControllerBase
    {
        private readonly AdminDbContext _context;

        public DashboardController(AdminDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetDashboardSummary()
        {
            // ===============================
            // BASIC COUNTS
            // ===============================
            var totalUsers = await _context.Users.CountAsync();

            var activeUsers = await _context.Users
                .CountAsync(u => u.BlockActiveStatus == 1);

            var blockedUsers = await _context.Users
                .CountAsync(u => u.BlockActiveStatus == -1);

            var pendingUsers = await _context.Users
                .CountAsync(u => u.Status == 0);

            // ✅ ROLE LOGIC (AS PER YOUR PROJECT)
            var totalFreelancers = await _context.Users
                .CountAsync(u => u.Rid == 2); // Freelancer

            var totalClients = await _context.Users
                .CountAsync(u => u.Rid == 3); // Client

            var totalServices = await _context.Services.CountAsync();
            var totalComplaints = await _context.Complaints.CountAsync();

            // ===============================
            // MONTHLY ACTIVITY (PIE CHART)
            // ===============================

            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var currentMonth = today.Month;
            var currentYear = today.Year;

            // ✅ Complaints raised this month (DateOnly logic)
            var complaintsThisMonth = await _context.Complaints
                .CountAsync(c =>
                    c.CreateDate.HasValue &&
                    c.CreateDate.Value.Month == currentMonth &&
                    c.CreateDate.Value.Year == currentYear);

            return Ok(new
            {
                // ===== EXISTING DATA =====
                TotalUsers = totalUsers,
                ActiveUsers = activeUsers,
                BlockedUsers = blockedUsers,
                PendingUsers = pendingUsers,
                TotalFreelancers = totalFreelancers,
                TotalClients = totalClients,
                TotalServices = totalServices,
                TotalComplaints = totalComplaints,

                // ===== PIE CHART DATA =====
                ComplaintsThisMonth = complaintsThisMonth
            });
        }
    }
}
