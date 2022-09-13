using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using WebApi.Database.Converters;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Managers;

public class CardManager
{
    private readonly Context _context;
    private readonly SectionManager _sectionManager;
    private readonly ILogger<CardManager> _logger;

    public CardManager(Context context,
                       SectionManager sectionManager,
                       ILogger<CardManager> logger)
    {
        _context = context;
        _sectionManager = sectionManager;
        _logger = logger;
    }

    public bool Exists(int cardId)
    {
        return _context.Cards.FirstOrDefault(dbCard => dbCard.Id == cardId) is not null;
    }

    public Card? Add(int sectionId, Card card)
    {
        try
        {
            var dbCard = CardConverter.ConvertToDb(card);
            var dbSection = _sectionManager.DbSection(sectionId);
            dbCard.Section = dbSection;
            dbCard.Position = Positions.GetCorrectedPosition(dbSection.Cards.Select(dbCard => (dbCard.Id, dbCard.Position)), card.Position, null);
            var cardEntry = _context.Cards.Add(dbCard);
            _context.SaveChanges();
            RefreshPositions(dbSection, cardEntry.Entity.Id);
            return CardConverter.ConvertFromDb(cardEntry.Entity);
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public Card? Update(Card card, int? newSectionId)
    {
        try
        {
            var dbCard = _context.Cards.FirstOrDefault(dbCard => dbCard.Id == card.Id) ?? throw new NullReferenceException();
            dbCard.Title = card.Title;
            dbCard.Description = card.Description;
            var dbSection = dbCard.Section;
            DbSection? oldSection = null;
            if(newSectionId.HasValue)
            {
                oldSection = dbCard.Section;
                var newDbSection = _sectionManager.DbSection(newSectionId.Value);
                dbCard.Section = newDbSection;
                dbSection = newDbSection;
            }
            dbCard.Position = Positions.GetCorrectedPosition(dbSection.Cards.Select(dbCard => (dbCard.Id, dbCard.Position)), card.Position, dbCard.Id);
            var cardEntry = _context.Cards.Update(dbCard);
            _context.SaveChanges();
            RefreshPositions(dbCard.Section, dbCard.Id);
            if(oldSection is not null)
                RefreshDeletedPositions(oldSection);
            return CardConverter.ConvertFromDb(cardEntry.Entity);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public bool Delete(int cardId)
    {
        try
        {
            var dbCard = _context.Cards.FirstOrDefault(dbCard => dbCard.Id == cardId) ?? throw new NullReferenceException();
            var dbSection = dbCard.Section;
            _context.Cards.Remove(dbCard);
            _context.SaveChanges();
            RefreshDeletedPositions(dbSection);
            return true;
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return false;
        }
    }

    private void RefreshPositions(DbSection dbSection, int cardId)
    {
        var newPositions = Positions.Refresh(dbSection.Cards.Select(dbCard => (dbCard.Id, dbCard.Position)), cardId);
        UpdatePositions(newPositions);
    }

    private void RefreshDeletedPositions(DbSection dbSection)
    {
        var newPositions = Positions.RefreshDeleted(dbSection.Cards.Select(dbCard => (dbCard.Id, dbCard.Position)));
        UpdatePositions(newPositions);
    }

    private void UpdatePositions(IEnumerable<(int, int)> newPositions)
    {
        foreach(var pair in newPositions)
        {
            var updatedDbCard = _context.Cards.FirstOrDefault(dbCard => dbCard.Id == pair.Item1) ?? throw new NullReferenceException();
            _logger.LogInformation($"Update card position [Id={pair.Item1}; oldPosition={updatedDbCard.Position}; newPosition={pair.Item2}]");
            updatedDbCard.Position = pair.Item2;
            _context.Cards.Update(updatedDbCard);
        }
        _context.SaveChanges();
    }
}
