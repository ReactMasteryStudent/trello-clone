namespace WebApi.Models;

public class Card
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public int? Position { get; set; }
    public string Description { get; set; } = "";
}