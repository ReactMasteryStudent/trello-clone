using System;
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
            dbCard.Position = dbSection.Cards.Count == 0 ? 1 : dbSection.Cards.Max(dbCard => dbCard.Position) + 1;
            var cardEntry = _context.Cards.Add(dbCard);
            _context.SaveChanges();
            return CardConverter.ConvertFromDb(cardEntry.Entity);
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            _logger.LogWarning(e.InnerException?.Message);
            return null;
        }
    }

    public Card? Update(Card card)
    {
        try
        {
            var dbCard = _context.Cards.FirstOrDefault(dbCard => dbCard.Id == card.Id) ?? throw new NullReferenceException();
            dbCard.Title = card.Title;
            dbCard.Description = card.Description;
            if(dbCard.Position != card.Position)
            {
                dbCard.Position = ComputePosition(dbCard.Section.Id, card.Position);
                RefreshPosition(dbCard.Section, dbCard);
            }
            var cardEntry = _context.Cards.Update(dbCard);
            _context.SaveChanges();
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
            _context.Cards.Remove(dbCard);
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

    private int ComputePosition(int sectionId, int? position)
    {
        var dbSection = _context.Sections.FirstOrDefault(dbSection => dbSection.Id == sectionId) ?? throw new NullReferenceException();

        if(!position.HasValue)
        {

        }
        return position!.Value;
    }

    private void RefreshPosition(DbSection dbSection, DbCard fixedCardPosition)
    {

    }
}
