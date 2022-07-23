using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApi.Database;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Initialization;

public class DatabaseInitialization
{
    private readonly Context _context;
    private readonly ILogger<Context> _logger;

    public DatabaseInitialization(Context context, ILogger<Context> logger)
    {
        _context = context;
        _logger = logger;
    }

    public void Initialize()
    {
        try
        {
            if(_context.Database.EnsureCreated())
                _logger.LogInformation("Database Created");
            _context.Database.Migrate();
            if(_context.Workspaces.ToList().Count == 0)
            {
                _context.Workspaces.Add(new DbWorkspace
                {
                    Name = "Default workspace"
                });
                _context.SaveChanges();
                _logger.LogInformation("Workspace initialized");
            }
        }
        catch(Exception e)
        {
            _logger.LogError("Exception during initialization");
            _logger.LogError(e.Message);
            _logger.LogError(e.InnerException?.Message);
        }   
    }
}