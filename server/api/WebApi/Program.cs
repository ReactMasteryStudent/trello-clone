using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApi.Database;
using WebApi.Database.Managers;
using WebApi.Initialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var dbSettingsSection = builder.Configuration.GetSection("DbSettings") ?? throw new System.Exception("");
var host = dbSettingsSection["Host"];
var port = dbSettingsSection["Port"];
var name = dbSettingsSection["Name"];
var user = dbSettingsSection["User"];
var password = dbSettingsSection["Password"];

var connectionString = $"server={host};" +
                       $"port={port};" +
                       $"database={name};" +
                       $"user={user};" +
                       $"password={password}";

Console.WriteLine($"ConnectionString = {connectionString}");

builder.Services.AddDbContext<Context>(options =>
{
    options.UseLazyLoadingProxies();

    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0)), b =>
    {
        b.MigrationsAssembly("WebApi");
        b.EnableRetryOnFailure();
    });
});
builder.Services.AddTransient<DatabaseInitialization>();
builder.Services.AddTransient<WorkspaceManager>();
builder.Services.AddTransient<BoardManager>();
builder.Services.AddTransient<SectionManager>();
builder.Services.AddControllers();
builder.Services.AddLogging();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<DatabaseInitialization>().Initialize();
}

app.MapControllers();

app.Run();