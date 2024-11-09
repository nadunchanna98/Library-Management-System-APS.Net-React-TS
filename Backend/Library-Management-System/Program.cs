using Library_Management_System.Models;
using Library_Management_System.Repositories;
using Library_Management_System.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register the DbContext with the connection string from appsettings.json.
builder.Services.AddDbContext<BookContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories
builder.Services.AddScoped<IBookRepository, BookRepository>();

// Register Services
builder.Services.AddScoped<IBookService, BookService>();

// Configure Swagger for API documentation (Optional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Enable Swagger if needed
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS Redirection (Optional based on your environment)
app.UseHttpsRedirection();

// Map controllers
app.MapControllers();

app.Run();
