using System.Linq;
using WebApi.Database.Models;
using WebApi.Models;

namespace WebApi.Database.Converters;

public static class BoardConverter
{
    public static Board ConvertFromDb(DbBoard dbBoard)
    {
        var board = new Board
        {
            Id = dbBoard.Id,
            Name = dbBoard.Name,
            Image = dbBoard.Image
        };

        foreach(var dbSection in dbBoard.Sections.OrderBy(dbSection => dbSection.Position))
        {
            board.Sections.Add(SectionConverter.ConvertFromDb(dbSection));
        }

        return board;
    }

    public static DbBoard ConvertToDb(Board board)
    {
        var dbBoard = new DbBoard
        {
            Id = board.Id,
            Name = board.Name,
            Image = board.Image ?? ""
        };

        foreach(var section in board.Sections)
        {
            dbBoard.Sections.Add(SectionConverter.ConvertToDb(section));
        }

        return dbBoard;
    }
}