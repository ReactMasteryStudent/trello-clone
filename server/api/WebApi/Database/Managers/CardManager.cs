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
            dbCard.Section = _sectionManager.DbSection(sectionId);
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

    public Card? Update(Card card, int? newSectionId)
    {
        try
        {
            var dbCard = _context.Cards.FirstOrDefault(dbCard => dbCard.Id == card.Id) ?? throw new NullReferenceException();
            dbCard.Title = card.Title;
            dbCard.Description = card.Description;
            if(newSectionId.HasValue)
            {
                dbCard.Section = _sectionManager.DbSection(newSectionId.Value);
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
}
