using Microsoft.EntityFrameworkCore;
using UserAuthApi.Data;

var builder = WebApplication.CreateBuilder(args);

<<<<<<< HEAD
// ===============================
// Database (MySQL)
// ===============================
=======
// -------------------- SERVICES --------------------

>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    );
});

// ===============================
// Controllers
// ===============================
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 🔥 IMPORTANT for null values from React
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

<<<<<<< HEAD
// ===============================
// CORS (React)
// ===============================
=======
// ✅ CORS — MUST ALLOW YOUR EXACT FRONTEND ORIGIN
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

<<<<<<< HEAD
// ===============================
// Swagger
// ===============================
=======
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

<<<<<<< HEAD
// ===============================
// MIDDLEWARE ORDER (VERY IMPORTANT)
// ===============================
=======
// -------------------- MIDDLEWARE --------------------
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

<<<<<<< HEAD
// ✅ CORS MUST be AFTER HTTPS and BEFORE MapControllers
app.UseCors("AllowReact");
=======
// 🔴 CRITICAL: CORS MUST COME BEFORE AUTH & MAPCONTROLLERS
app.UseCors("AllowReactApp");

// ❗ TEMPORARILY COMMENT THIS IF PRESENT
// app.UseAuthentication();
// app.UseAuthorization();
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7

app.MapControllers();

app.Run();
