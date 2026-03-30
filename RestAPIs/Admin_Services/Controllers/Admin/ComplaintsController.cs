using Admin_Services.Data;
using Admin_Services.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/complaints")]
    [Authorize(Roles = "ADMIN")]
    public class ComplaintsController : ControllerBase
    {
        private readonly AdminDbContext _context;

        public ComplaintsController(AdminDbContext context)
        {
            _context = context;
        }

        // ======================================
        // 1️⃣ GET ALL COMPLAINTS
        // ======================================
        [HttpGet]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await (
                from c in _context.Complaints
                join freelancer in _context.Users
                    on c.ToUserId equals freelancer.Uid
                join s in _context.Services
                    on c.ServiceId equals s.ServiceId
                select new ComplaintResponseDto
                {
                    ComplaintId = c.ComplaintId,
                    Description = c.Description,
                    CreateDate = c.CreateDate,
                    Status = c.Status,

                    ServiceName = s.ServiceName,

                    FreelancerId = freelancer.Uid,
                    FreelancerName = freelancer.Fname + " " + freelancer.Lname,
                    IsFreelancerBlocked = freelancer.BlockActiveStatus == -1
                }
            ).ToListAsync();

            return Ok(complaints);
        }

        // ======================================
        // 2️⃣ GET COMPLAINT BY ID
        // ======================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintById(int id)
        {
            var complaint = await (
                from c in _context.Complaints
                join freelancer in _context.Users
                    on c.ToUserId equals freelancer.Uid
                join s in _context.Services
                    on c.ServiceId equals s.ServiceId
                where c.ComplaintId == id
                select new ComplaintResponseDto
                {
                    ComplaintId = c.ComplaintId,
                    Description = c.Description,
                    CreateDate = c.CreateDate,
                    Status = c.Status,

                    ServiceName = s.ServiceName,

                    FreelancerId = freelancer.Uid,
                    FreelancerName = freelancer.Fname + " " + freelancer.Lname,
                    IsFreelancerBlocked = freelancer.BlockActiveStatus == -1
                }
            ).FirstOrDefaultAsync();

            if (complaint == null)
                return NotFound("Complaint not found");

            return Ok(complaint);
        }

        // ======================================
        // 3️⃣ BLOCK / UNBLOCK FREELANCER
        // ======================================
        [HttpPut("block-user")]
        public async Task<IActionResult> BlockUnblockUser([FromBody] StatusUpdateDto request)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
                return NotFound("User not found");

            // 1 = Active, -1 = Blocked
            user.BlockActiveStatus = request.Status;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Freelancer block status updated successfully",
                IsBlocked = user.BlockActiveStatus == -1
            });
        }
    }
}
