using Admin_Services.Data;
using Admin_Services.DTOs;
using Admin_Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/services")]
    [Authorize(Roles = "ADMIN")]
    public class ServicesController : ControllerBase
    {
        private readonly AdminDbContext _context;

        public ServicesController(AdminDbContext context)
        {
            _context = context;
        }

        // ===============================
        // 1️⃣ GET ALL SERVICES
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetAllServices()
        {
            var services = await _context.Services
                .Select(s => new
                {
                    s.ServiceId,
                    s.ServiceName,
                    s.Description
                })
                .ToListAsync();

            return Ok(services);
        }

        // ===============================
        // 2️⃣ ADD SERVICE
        // ===============================
        [HttpPost]
        public async Task<IActionResult> AddService([FromBody] ServiceDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ServiceName))
                return BadRequest("Service name is required");

            var service = new Service
            {
                ServiceName = dto.ServiceName,
                Description = dto.Description
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return Ok(service);
        }

        // ===============================
        // 3️⃣ UPDATE SERVICE
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceDto dto)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound("Service not found");

            service.ServiceName = dto.ServiceName;
            service.Description = dto.Description;

            await _context.SaveChangesAsync();

            return Ok(service);
        }

        // ===============================
        // 4️⃣ DELETE SERVICE (HARD DELETE)
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound("Service not found");

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return Ok("Service deleted successfully");
        }
    }
}
