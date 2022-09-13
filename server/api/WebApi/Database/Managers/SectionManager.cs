using System;
using System.Collections.Generic;
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
    private readonly ILogger<SectionManager> _logger;

    public SectionManager(Context context,
                          BoardManager boardManager,
                          ILogger<SectionManager> logger)
    {
        _context = context;
        _boardManager = boardManager;
        _logger = logger;
    }

    public bool Exists(int sectionId)
    {
        return _context.Sections.FirstOrDefault(dbSection => dbSection.Id == sectionId) is not null;
    }

    public DbSection DbSection(int sectionId)
    {
        return _context.Sections.FirstOrDefault(dbSection => dbSection.Id == sectionId) ?? throw new NullReferenceException();
    }

    public Section? Add(int boardId, Section section)
    {
        try
        {
            var dbSection = SectionConverter.ConvertToDb(section);
            var dbBoard = _boardManager.DbBoard(boardId);
            dbSection.Board = dbBoard;
            dbSection.Position = Positions.GetCorrectedPosition(dbBoard.Sections.Select(dbSec => (dbSec.Id, dbSec.Position)), section.Position, null);
            var sectionEntry = _context.Sections.Add(dbSection);
            _context.SaveChanges();
            RefreshPositions(dbBoard, sectionEntry.Entity.Id);
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
            dbSection.Name = section.Name;
            dbSection.Position = Positions.GetCorrectedPosition(dbSection.Board.Sections.Select(dbSec => (dbSec.Id, dbSec.Position)), section.Position, section.Id);
            var sectionEntry = _context.Sections.Update(dbSection);
            _context.SaveChanges();
            RefreshPositions(dbSection.Board, sectionEntry.Entity.Id);
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
            var dbBoard = dbSection.Board;
            _context.Sections.Remove(dbSection);
            _context.SaveChanges();
            RefreshDeletedPositions(dbBoard);
            return true;
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return false;
        }
    }

    private void RefreshPositions(DbBoard dbBoard, int sectionId)
    {
        var newPositions = Positions.Refresh(dbBoard.Sections.Select(dbSec => (dbSec.Id, dbSec.Position)), sectionId);
        UpdatePositions(newPositions);
    }

    private void RefreshDeletedPositions(DbBoard dbBoard)
    {
        var newPositions = Positions.RefreshDeleted(dbBoard.Sections.Select(dbSec => (dbSec.Id, dbSec.Position)));
        UpdatePositions(newPositions);
    }

    private void UpdatePositions(IEnumerable<(int, int)> newPositions)
    {
        foreach(var pair in newPositions)
        {
            var updatedDbSection = _context.Sections.FirstOrDefault(dbSection => dbSection.Id == pair.Item1) ?? throw new NullReferenceException();
            _logger.LogInformation($"Update section position [Id={pair.Item1}; oldPosition={updatedDbSection.Position}; newPosition={pair.Item2}]");
            updatedDbSection.Position = pair.Item2;
            _context.Sections.Update(updatedDbSection);
        }
        _context.SaveChanges();
    }
}
