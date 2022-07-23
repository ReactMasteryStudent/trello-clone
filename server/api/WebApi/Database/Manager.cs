using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using WebApi.Database.Converters;
using WebApi.Models;

namespace WebApi.Database;

public class Manager
{
    private readonly Context _context;
    private readonly ILogger<Manager> _logger;

    public Manager(Context context,
                   ILogger<Manager> logger)
    {
        _context = context;
        _logger = logger;
    }

    public Workspace Workspace()
    {
        var workspace = _context.Workspaces.AsQueryable().FirstOrDefault();
        return workspace is not null ? WorkspaceConverter.ConvertFromDb(workspace) : new Workspace();
    }

    public bool Exists(Workspace workspace)
    {
        return _context.Workspaces.Any(dbWorkspace => dbWorkspace.Id == workspace.Id);
    }

    public bool Update(Workspace workspace)
    {
        try
        {
            _context.Workspaces.Update(WorkspaceConverter.ConvertToDb(workspace));
            _context.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}