using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuthApi.Data;

namespace UserAuthApi.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationController(AppDbContext context)
        {
            _context = context;
        }

        // GET All States
        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            var states = await _context.States
                .OrderBy(s => s.StateName)
                .Select(s => new { s.StateId, s.StateName })
                .ToListAsync();

            return Ok(states);
        }

        // GET Cities by StateId
        [HttpGet("cities/{stateId}")]
        public async Task<IActionResult> GetCitiesByState(int stateId)
        {
            var cities = await _context.Cities
                .Where(c => c.StateId == stateId)
                .OrderBy(c => c.CityName)
                .Select(c => new { c.CityId, c.CityName })
                .ToListAsync();

            return Ok(cities);
        }
    }
}