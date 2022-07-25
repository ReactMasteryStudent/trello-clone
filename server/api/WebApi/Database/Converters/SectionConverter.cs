using System.Linq;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Converters;

public static class SectionConverter
{
    public static Section ConvertFromDb(DbSection dbSection)
    {
        var section = new Section
        {
            Id = dbSection.Id,
            Name = dbSection.Name,
            Position = dbSection.Position
        };

        foreach(var dbCard in dbSection.Cards.OrderBy(dbCard => dbCard.Position))
        {
            section.Cards.Add(CardConverter.ConvertFromDb(dbCard));
        }

        return section;
    }

    public static DbSection ConvertToDb(Section section)
    {
        var dbSection = new DbSection
        {
            Id = section.Id,
            Name = section.Name,
            Position = section.Position ?? 0
        };

        foreach(var card in section.Cards)
        {
            dbSection.Cards.Add(CardConverter.ConvertToDb(card));
        }

        return dbSection;
    }
}