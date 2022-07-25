using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using WebApi.Database.Converters;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Managers;

public class BoardManager
{
    private readonly Context _context;
    private readonly WorkspaceManager _workspaceManager;
    private readonly ILogger<BoardManager> _logger;

    public BoardManager(Context context,
                        WorkspaceManager workspaceManager,
                        ILogger<BoardManager> logger)
    {
        _context = context;
        _workspaceManager = workspaceManager;
        _logger = logger;
    }

    public bool Exists(int boardId)
    {
        return _context.Boards.FirstOrDefault(dbBoard => dbBoard.Id == boardId) is not null;
    }

    public DbBoard DbBoard(int boardId)
    {
        return _context.Boards.FirstOrDefault(dbBoard => dbBoard.Id == boardId) ?? throw new NullReferenceException();
    }

    public Board? Add(Board board)
    {
        try
        {
            var dbBoard = BoardConverter.ConvertToDb(board);
            dbBoard.Workspace = _workspaceManager.DbWorkspace();
            var boardEntry = _context.Boards.Add(dbBoard);
            _context.SaveChanges();
            return BoardConverter.ConvertFromDb(boardEntry.Entity);
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public Board? Update(Board board)
    {
        try
        {
            var dbBoard = _context.Boards.FirstOrDefault(dbBoard => dbBoard.Id == board.Id) ?? throw new NullReferenceException();
            dbBoard.Image = board.Image;
            dbBoard.Name = board.Name;
            var boardEntry = _context.Boards.Update(dbBoard);
            _context.SaveChanges();
            return BoardConverter.ConvertFromDb(boardEntry.Entity);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public bool Delete(int boardId)
    {
        try
        {
            var dbBoard = _context.Boards.FirstOrDefault(dbBoard => dbBoard.Id == boardId) ?? throw new NullReferenceException();
            _context.Boards.Remove(dbBoard);
            _context.SaveChanges();
            return true;
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return false;
        }
    }
}
