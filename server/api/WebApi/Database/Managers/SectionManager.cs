using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using WebApi.Database.Converters;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Managers;

public class SectionManager
{
    private readonly Context _context;
    private readonly BoardManager _boardManager;
    private readonly ILogger<BoardManager> _logger;

    public SectionManager(Context context,
                          BoardManager boardManager,
                          ILogger<BoardManager> logger)
    {
        _context = context;
        _boardManager = boardManager;
        _logger = logger;
    }

    public bool Exists(int sectionId)
    {
        return _context.Sections.FirstOrDefault(dbSection => dbSection.Id == sectionId) is not null;
    }

    public Section? Add(int boardId, Section section)
    {
        try
        {
            section.Position = ComputePosition(boardId, section.Position);
            var dbSection = SectionConverter.ConvertToDb(section);
            dbSection.Board = _boardManager.DbBoard(boardId);
            var sectionEntry = _context.Sections.Add(dbSection);
            _context.SaveChanges();
            return SectionConverter.ConvertFromDb(sectionEntry.Entity);
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public Section? Update(Section section)
    {
        try
        {
            var dbSection = _context.Sections.FirstOrDefault(dbSection => dbSection.Id == section.Id) ?? throw new NullReferenceException();
            int newPosition = ComputePosition(dbSection.Board.Id, section.Position);
            dbSection.Name = section.Name;
            dbSection.Position = newPosition;
            var sectionEntry = _context.Sections.Update(dbSection);
            _context.SaveChanges();
            return SectionConverter.ConvertFromDb(sectionEntry.Entity);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public bool Delete(int sectionId)
    {
        try
        {
            var dbSection = _context.Sections.FirstOrDefault(dbSection => dbSection.Id == sectionId) ?? throw new NullReferenceException();
            _context.Sections.Remove(dbSection);
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

    private int ComputePosition(int boardId, int? actualPosition)
    {
        var dbBoard = _boardManager.DbBoard(boardId);
        if(!actualPosition.HasValue || 
           dbBoard.Sections.FirstOrDefault(dbSection => dbSection.Position == actualPosition.Value) is not null ||
           dbBoard.Sections.Max(dbSection => dbSection.Position) + 1 != actualPosition.Value)
        {
            if(dbBoard.Sections.Count != 0)
            {
                return dbBoard.Sections.Max(dbSection => dbSection.Position) + 1;
            }
            return 1;
        }
        return actualPosition!.Value;
    }
}
