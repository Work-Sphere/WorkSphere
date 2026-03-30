using Admin_Services.Data;
using Admin_Services.DTOs;
using Admin_Services.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AdminDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AdminDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // =========================================
        // POST: api/admin/auth/login
        // =========================================
        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin([FromBody] AdminLoginRequestDto request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Phone) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Phone and password are required");
            }

            // 🔍 Find admin by phone
            var admin = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (admin == null)
                return Unauthorized("Invalid phone or password");

            // 🔐 Check ADMIN role (RID = 1)
            if (admin.Rid != 1)
                return Unauthorized("Access denied. Not an admin.");

            // 🔑 Password verification
            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(request.Password, admin.Pass);

            if (!isPasswordValid)
                return Unauthorized("Invalid phone or password");

            // 🎫 Generate JWT token
            string token = GenerateJwtToken(admin);

            return Ok(new
            {
                message = "Admin login successful",
                uid = admin.Uid,
                name = admin.Fname,
                token
            });
        }

        // =========================================
        // JWT TOKEN GENERATION (ADMIN)
        // =========================================
        private string GenerateJwtToken(User admin)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Uid.ToString()),
                new Claim(ClaimTypes.Role, "ADMIN"),
                new Claim("rid", admin.Rid.ToString())
            };

            // ✅ SAFE JWT KEY ACCESS
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey))
                throw new InvalidOperationException("JWT Key is not configured");

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

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
