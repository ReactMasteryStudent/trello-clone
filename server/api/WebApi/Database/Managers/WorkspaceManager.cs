using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using WebApi.Database.Converters;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Managers;

public class WorkspaceManager
{
    private readonly Context _context;
    private readonly ILogger<WorkspaceManager> _logger;

    public WorkspaceManager(Context context,
                            ILogger<WorkspaceManager> logger)
    {
        _context = context;
        _logger = logger;
    }

    public bool Exists(int workspaceId)
    {
        return _context.Workspaces.Any(dbWorkspace => dbWorkspace.Id == workspaceId);
    }

    public Workspace Workspace()
    {
        var workspace = _context.Workspaces.AsQueryable().FirstOrDefault();
        return workspace is not null ? WorkspaceConverter.ConvertFromDb(workspace) : new Workspace();
    }
    
    public DbWorkspace DbWorkspace()
    {
        var dbWorkspace = _context.Workspaces.AsQueryable().FirstOrDefault() ?? throw new NullReferenceException();
        return dbWorkspace;
    }

    public Workspace? Update(Workspace workspace)
    {
        try
        {
            var dbWorkspace = _context.Workspaces.FirstOrDefault(dbWorkspace => dbWorkspace.Id == workspace.Id) ?? throw new NullReferenceException();
            dbWorkspace.Name = workspace.Name;
            var workspaceEntry = _context.Workspaces.Update(dbWorkspace);
            _context.SaveChanges();
            return WorkspaceConverter.ConvertFromDb(workspaceEntry.Entity);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }
}