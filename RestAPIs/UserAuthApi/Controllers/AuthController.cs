using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserAuthApi.Data;
using UserAuthApi.DTOs;
using UserAuthApi.Models;

namespace UserAuthApi.Controllers
{
    [EnableCors("AllowReactApp")]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

                // ✅ REQUIRED FIX
                Gender = "NA",   // default value since you don't want gender

                Status = 0,           // Pending admin approval
                BlockActiveStatus = 1 // Active (not blocked)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Registration successful. Waiting for admin approval."
            });
        }

        // ---------------- LOGIN ----------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (user == null)
                return BadRequest("Invalid phone number");

            bool isPasswordCorrect =
                BCrypt.Net.BCrypt.Verify(request.Pass, user.Pass);

            if (!isPasswordCorrect)
                return BadRequest("Invalid password");

            if (user.BlockActiveStatus == -1)
                return BadRequest("Account blocked by admin");

            if (!user.Status.HasValue || user.Status.Value == 0)
                return BadRequest("Account pending admin approval");

            if (user.Status.Value == -1)
                return BadRequest("Account rejected by admin");

            string token = GenerateJwtToken(user);

            string role =
                user.Rid == 1 ? "ADMIN" :
                user.Rid == 2 ? "FREELANCER" :
                user.Rid == 3 ? "CLIENT" :
                "USER";

            return Ok(new
            {
                message = "Login successful",
                uid = user.Uid,
                rid = user.Rid,
                name = user.Fname,
                role = role,
                token = token
            });
        }

        // ---------------- FORGOT PASSWORD ----------------
        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(
            [FromBody] ForgotPasswordRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (user == null)
                return BadRequest("Phone number not registered");

            user.Pass = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password updated successfully" });
        }

        // ---------------- JWT ----------------
        private string GenerateJwtToken(User user)
        {
            string role =
                user.Rid == 1 ? "ADMIN" :
                user.Rid == 2 ? "FREELANCER" :
                user.Rid == 3 ? "CLIENT" :
                "USER";

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Uid.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim("rid", user.Rid.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var creds = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
