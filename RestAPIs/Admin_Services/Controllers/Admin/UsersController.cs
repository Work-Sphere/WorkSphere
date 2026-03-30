using Admin_Services.Data;
using Admin_Services.DTOs;
using Admin_Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "ADMIN")]
    public class UsersController : ControllerBase
    {
        private readonly AdminDbContext _context;

        public UsersController(AdminDbContext context)
        {
            _context = context;
        }

        // ======================================
        // 1️⃣ GET ALL USERS
        // ======================================
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new UserResponseDto
                {
                    Uid = u.Uid,
                    FullName = (u.Fname ?? string.Empty) + " " + (u.Lname ?? string.Empty),
                    Email = u.Email,
                    Phone = u.Phone,
                    Status = u.Status,
                    BlockActiveStatus = u.BlockActiveStatus,
                    RoleId = u.Rid
                })
                .ToListAsync();

            return Ok(users);
        }

        // ======================================
        // 2️⃣ GET PENDING USERS
        // ======================================
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingUsers()
        {
            var pendingUsers = await _context.Users
                .Where(u => u.Status == 0)
                .Select(u => new UserResponseDto
                {
                    Uid = u.Uid,
                    FullName = (u.Fname ?? string.Empty) + " " + (u.Lname ?? string.Empty),
                    Email = u.Email,
                    Phone = u.Phone,
                    Status = u.Status,
                    BlockActiveStatus = u.BlockActiveStatus,
                    RoleId = u.Rid
                })
                .ToListAsync();

            return Ok(pendingUsers);
        }

        // ======================================
        // 3️⃣ APPROVE USER
        // ======================================
        [HttpPut("approve")]
        public async Task<IActionResult> ApproveUser(
            [FromBody] StatusUpdateDto request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
                return NotFound("User not found");

            user.Status = 1;             // Approved
            user.BlockActiveStatus = 1;  // Active

            await _context.SaveChangesAsync();
            return Ok("User approved successfully");
        }

        // ======================================
        // 4️⃣ REJECT USER
        // ======================================
        [HttpPut("reject")]
        public async Task<IActionResult> RejectUser(
            [FromBody] StatusUpdateDto request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
                return NotFound("User not found");

            user.Status = -1;            // Rejected
            user.BlockActiveStatus = -1; // Blocked

            await _context.SaveChangesAsync();
            return Ok("User rejected successfully");
        }

        // ======================================
        // 5️⃣ BLOCK / UNBLOCK USER (REQUEST BODY)
        // ======================================
        [HttpPut("block")]
        public async Task<IActionResult> BlockUnblockUser(
            [FromBody] StatusUpdateDto request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
                return NotFound("User not found");

            // 1 = Active, -1 = Blocked
            user.BlockActiveStatus = request.Status;

            await _context.SaveChangesAsync();
            return Ok("User block status updated successfully");
        }

        // ======================================
        // 6️⃣ BLOCK / UNBLOCK USER (FROM COMPLAINT PAGE)
        // ======================================
        [HttpPut("block-toggle/{userId}")]
        public async Task<IActionResult> ToggleBlockUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound("User not found");

            // Toggle logic
            user.BlockActiveStatus =
                user.BlockActiveStatus == -1 ? 1 : -1;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "User block status toggled successfully",
                IsBlocked = user.BlockActiveStatus == -1
            });
        }

        // ======================================
        // 7️⃣ RESET USER PASSWORD
        // ======================================
        [HttpPut("reset-password")]
        public async Task<IActionResult> ResetPassword(
            [FromBody] PasswordResetDto request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
                return NotFound("User not found");

            user.Pass = request.NewPassword;
            await _context.SaveChangesAsync();

            return Ok("Password reset successfully");
        }
    }
}
