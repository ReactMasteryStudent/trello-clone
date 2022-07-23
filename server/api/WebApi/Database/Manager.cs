using System.Linq;
using WebApi.Database.Converters;
using WebApi.Models;

namespace WebApi.Database;

public class Manager
{
    private readonly Context _context;

    public Manager(Context context)
    {
        _context = context;
    }

    public Workspace Workspace()
    {
        var workspace = _context.Workspaces.AsQueryable().FirstOrDefault();
        return workspace is not null ? WorkspaceConverter.ConvertFromDb(workspace) : new Workspace();
    }
}