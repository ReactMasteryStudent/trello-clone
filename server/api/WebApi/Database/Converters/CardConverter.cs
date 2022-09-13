using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Converters;

public static class CardConverter
{
    public static Card ConvertFromDb(DbCard card)
    {
        return new Card
        {
            Id = card.Id,
            Title = card.Title,
            Description = card.Description,
            Position = card.Position
        };
    }

    public static DbCard ConvertToDb(Card card)
    {
        return new DbCard
        {
            Id = card.Id,
            Title = card.Title,
            Description = card.Description,
            Position = card.Position ?? 0
        };
    }
}