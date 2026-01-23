using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuthApi.Data;
using UserAuthApi.DTOs;
using UserAuthApi.Models;
using BCrypt.Net;

namespace UserAuthApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

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

                // ✅ updated (int FK)
                State = request.State,
                City = request.City,

                // ✅ updated (int now)
                Status = 1
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully ✅");
        }


        // ✅ LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return BadRequest("Invalid Email");

            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(request.Pass, user.Pass);

            if (!isPasswordCorrect)
                return BadRequest("Invalid Password");

            var response = new LoginResponse
            {
                Message = "Login Successful ✅",
                Uid = user.Uid,
                Rid = user.Rid,
                Fname = user.Fname,
                Lname = user.Lname,
                Email = user.Email
            };

            return Ok(response);
        }
    }
}
