namespace WebApi.Database.Models;

#nullable disable
public class DbCard
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Position { get; set; }
    public string Description { get; set; }
}