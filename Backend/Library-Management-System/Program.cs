using Library_Management_System.Models;
using Library_Management_System.Repositories;
using Library_Management_System.Services;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

//  DbContext
builder.Services.AddDbContext<BookContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();

// Swagger 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    System.Diagnostics.Process.Start(new ProcessStartInfo
    {
        FileName = "http://localhost:7251/swagger/index.html",
        UseShellExecute = true
    });

}

// Enable HTTPS Redirection (Optional based on your environment)
app.UseHttpsRedirection();

// Map controllers
app.MapControllers();

app.Run();
