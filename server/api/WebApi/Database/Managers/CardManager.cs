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
            dbCard.Section = _sectionManager.DbSection(sectionId);
            dbCard.Position = ComputePosition(sectionId, card.Position);
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
                var emptyPosition = dbCard.Position;
                dbCard.Position = ComputePosition(dbCard.Section.Id, card.Position);
                RefreshPositions(dbCard.Section, dbCard, emptyPosition);
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
        var dbSection = _sectionManager.DbSection(sectionId);
        var maxPosition = dbSection.Cards.Count == 0 ? 0 : dbSection.Cards.Max(dbCard => dbCard.Position);
        if(!position.HasValue)
        {
            return maxPosition + 1;
        }
        if(position < 1)
            return 1;
        if(position > maxPosition + 1)
            return maxPosition + 1;
        return position!.Value;
    }

    private void RefreshPositions(DbSection dbSection, DbCard fixedCardPosition, int emptyPosition)
    {
        var orderedCards = dbSection.Cards.OrderBy(dbCard => dbCard.Position);
        var positionToAdd = 0;
        var itemToSkip = 0;
        var itemToTake = 0;
        if(fixedCardPosition.Position < emptyPosition)
        {
            positionToAdd = 1;
            itemToSkip = orderedCards.Count(dbCard => dbCard.Position < fixedCardPosition.Position);
            itemToTake = orderedCards.Skip(itemToSkip).Count(dbCard => dbCard.Position <= emptyPosition);
        }
        else
        {
            positionToAdd = -1;
            itemToSkip = orderedCards.Count(dbCard => dbCard.Position < emptyPosition);
            itemToTake = orderedCards.Skip(itemToSkip).Count(dbCard => dbCard.Position <= fixedCardPosition.Position);
        }
        foreach(var card in orderedCards.Skip(itemToSkip).Take(itemToTake))
        {
            if(card.Id == fixedCardPosition.Id)
                continue;
            _logger.LogInformation($"Update position of card {card.Id}-{card.Title} [Old position={card.Position}; New position {card.Position + positionToAdd}]");
            card.Position += positionToAdd;
        }
    }
}
