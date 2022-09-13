using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Converters;

public static class WorkspaceConverter
{
    public static Workspace ConvertFromDb(DbWorkspace dbWorkspace)
    {
        var workspace = new Workspace
        {
            Id = dbWorkspace.Id,
            Name = dbWorkspace.Name
        };

        foreach(var dbBoard in dbWorkspace.Boards)
        {
            workspace.Boards.Add(BoardConverter.ConvertFromDb(dbBoard));
        }

        return workspace;
    }

    public static DbWorkspace ConvertToDb(Workspace workspace)
    {
        var dbWorkspace = new DbWorkspace
        {
            Id = workspace.Id,
            Name = workspace.Name
        };

        foreach(var board in workspace.Boards)
        {
            dbWorkspace.Boards.Add(BoardConverter.ConvertToDb(board));
        }

        return dbWorkspace;
    }
}