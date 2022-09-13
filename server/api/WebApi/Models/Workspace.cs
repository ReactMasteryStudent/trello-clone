using System.Collections.Generic;

namespace WebApi.Models;

public class Workspace
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public IList<Board> Boards { get; set; } = new List<Board>();
}