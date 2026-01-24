using Microsoft.EntityFrameworkCore;
using UserAuthApi.Data;

var builder = WebApplication.CreateBuilder(args);

// -------------------- SERVICES --------------------

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    );
});

builder.Services.AddControllers();

// ✅ CORS — MUST ALLOW YOUR EXACT FRONTEND ORIGIN
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// -------------------- MIDDLEWARE --------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔴 CRITICAL: CORS MUST COME BEFORE AUTH & MAPCONTROLLERS
app.UseCors("AllowReactApp");

// ❗ TEMPORARILY COMMENT THIS IF PRESENT
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();
