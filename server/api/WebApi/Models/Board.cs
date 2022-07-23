using System.Collections.Generic;

namespace WebApi.Models;

public class Board
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Image { get; set; }
    public IList<Section> Sections { get; set; } = new List<Section>();
}