using System.Collections.Generic;

namespace WebApi.Models;

public class Section
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int? Position { get; set; }
    public IList<Card> Cards { get; set; } = new List<Card>();
}