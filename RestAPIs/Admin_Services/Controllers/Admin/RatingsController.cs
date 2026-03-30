using Admin_Services.Data;
using Admin_Services.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin_Services.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/ratings")]
    [Authorize(Roles = "ADMIN")]
    public class RatingsController : ControllerBase
    {
        private readonly AdminDbContext _context;

        public RatingsController(AdminDbContext context)
        {
            _context = context;
        }

        // ======================================
        // GET ALL RATINGS
        // ======================================
        [HttpGet]
        public async Task<IActionResult> GetAllRatings()
        {
            var ratings = await (
                from r in _context.Ratings
                join fromUser in _context.Users
                    on r.FromUserId equals fromUser.Uid
                join freelancer in _context.Users
                    on r.ToUserId equals freelancer.Uid
                join s in _context.Services
                    on r.ServiceId equals s.ServiceId
                select new RatingResponseDto
                {
                    RatingId = r.RatingId,
                    FromUserId = fromUser.Uid,
                    FreelancerId = freelancer.Uid,
                    ServiceId = s.ServiceId,

                    FromUserName = (fromUser.Fname ?? "") + " " + (fromUser.Lname ?? ""),
                    FreelancerName = (freelancer.Fname ?? "") + " " + (freelancer.Lname ?? ""),
                    ServiceName = s.ServiceName,

                    Rating = r.Rating1,
                    Review = r.Review,

                    // ✅ FIX: DateTime? → DateOnly?
                    RatingDate = r.RatingDate.HasValue
                        ? DateOnly.FromDateTime(r.RatingDate.Value)
                        : null
                }
            ).ToListAsync();

            return Ok(ratings);
        }

        // ======================================
        // GET RATING BY ID
        // ======================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRatingById(int id)
        {
            var rating = await (
                from r in _context.Ratings
                join fromUser in _context.Users
                    on r.FromUserId equals fromUser.Uid
                join freelancer in _context.Users
                    on r.ToUserId equals freelancer.Uid
                join s in _context.Services
                    on r.ServiceId equals s.ServiceId
                where r.RatingId == id
                select new RatingResponseDto
                {
                    RatingId = r.RatingId,
                    FromUserId = fromUser.Uid,
                    FreelancerId = freelancer.Uid,
                    ServiceId = s.ServiceId,

                    FromUserName = (fromUser.Fname ?? "") + " " + (fromUser.Lname ?? ""),
                    FreelancerName = (freelancer.Fname ?? "") + " " + (freelancer.Lname ?? ""),
                    ServiceName = s.ServiceName,

                    Rating = r.Rating1,
                    Review = r.Review,

                    // ✅ FIX HERE ALSO
                    RatingDate = r.RatingDate.HasValue
                        ? DateOnly.FromDateTime(r.RatingDate.Value)
                        : null
                }
            ).FirstOrDefaultAsync();

            if (rating == null)
                return NotFound("Rating not found");

            return Ok(rating);
        }
    }
}
