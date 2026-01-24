using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuthApi.Data;
using UserAuthApi.DTOs;
using UserAuthApi.Models;

namespace UserAuthApi.Controllers
{
    [EnableCors("AllowReactApp")]   // ✅ FIX CORS
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // ---------------- REGISTER ----------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (existingUser != null)
                return BadRequest("Email already exists!");

            var user = new User
            {
                Rid = request.Rid,
                Fname = request.Fname,
                Lname = request.Lname,
                Email = request.Email,
                Pass = BCrypt.Net.BCrypt.HashPassword(request.Pass),
                Phone = request.Phone,
                Addr = request.Addr,
                State = request.State,
                City = request.City,
                Status = 1
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        // ---------------- LOGIN ----------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (user == null)
                return BadRequest("Invalid Phone Number");

            bool isPasswordCorrect =
                BCrypt.Net.BCrypt.Verify(request.Pass, user.Pass);

            if (!isPasswordCorrect)
                return BadRequest("Invalid Password");

            var response = new LoginResponse
            {
                Message = "Login Successful",
                Uid = user.Uid,
                Rid = user.Rid,
                Fname = user.Fname,
                Lname = user.Lname,
                Email = user.Email
            };

            return Ok(response);
        }

        // ---------------- FORGOT / RESET PASSWORD ----------------
        [HttpPost("forgot-password")]
        [AllowAnonymous] // ✅ IMPORTANT: allow unauthenticated access
        public async Task<IActionResult> ForgotPassword(
            [FromBody] ForgotPasswordRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (user == null)
                return BadRequest("Phone number not registered");

            // ✅ HASH NEW PASSWORD
            user.Pass = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Password updated successfully" });
        }
    }
}
