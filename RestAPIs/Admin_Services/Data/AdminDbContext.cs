using Microsoft.EntityFrameworkCore;
using Admin_Services.Models;

namespace Admin_Services.Data
{
    public class AdminDbContext : DbContext
    {
        public AdminDbContext(DbContextOptions<AdminDbContext> options)
            : base(options)
        {
        }

        // ================= DB SETS =================
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<Complaint> Complaints { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ================= USER =================
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToTable("user");

                entity.Property(e => e.Uid).HasColumnName("uid");
                entity.Property(e => e.Fname).HasColumnName("fname");
                entity.Property(e => e.Lname).HasColumnName("lname");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Pass).HasColumnName("pass");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.BlockActiveStatus).HasColumnName("block_active_status");
                entity.Property(e => e.State).HasColumnName("state");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Rid).HasColumnName("rid");
            });

            // ================= ROLE =================
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid);
                entity.ToTable("role");

                entity.Property(e => e.Rid).HasColumnName("rid");
                entity.Property(e => e.Rname).HasColumnName("rname");
            });

            // ================= SERVICE (FIXED) =================
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.ServiceId);
                entity.ToTable("services");

                entity.Property(e => e.ServiceId).HasColumnName("service_id");
                entity.Property(e => e.ServiceName).HasColumnName("service_name");
                entity.Property(e => e.Description).HasColumnName("description");

                // ❌ COLUMN DOES NOT EXIST IN DB
                entity.Ignore(e => e.IsActive);
            });

            // ================= COMPLAINT =================
            modelBuilder.Entity<Complaint>(entity =>
            {
                entity.HasKey(e => e.ComplaintId);
                entity.ToTable("complaints");

                entity.Property(e => e.ComplaintId).HasColumnName("complaint_id");
                entity.Property(e => e.FromUserId).HasColumnName("from_user_id");
                entity.Property(e => e.ToUserId).HasColumnName("to_user_id");
                entity.Property(e => e.ServiceId).HasColumnName("service_id");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.CreateDate).HasColumnName("create_date");
                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.FromUser)
                    .WithMany(p => p.ComplaintsFrom)
                    .HasForeignKey(d => d.FromUserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.ToUser)
                    .WithMany(p => p.ComplaintsTo)
                    .HasForeignKey(d => d.ToUserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.Complaints)
                    .HasForeignKey(d => d.ServiceId);
            });

            // ================= RATING =================
            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasKey(e => e.RatingId);
                entity.ToTable("rating");

                entity.Property(e => e.RatingId).HasColumnName("rating_id");
                entity.Property(e => e.FromUserId).HasColumnName("from_user_id");
                entity.Property(e => e.ToUserId).HasColumnName("to_user_id");
                entity.Property(e => e.ServiceId).HasColumnName("service_id");
                entity.Property(e => e.Rating1).HasColumnName("rating");
                entity.Property(e => e.Review).HasColumnName("review");
                entity.Property(e => e.RatingDate).HasColumnName("rating_date");
            });
        }
    }
}
