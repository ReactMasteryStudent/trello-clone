using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace WebApi.Database.Models;

#nullable disable
public class DbBoard
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public virtual ICollection<DbSection> Sections { get; set; } = new Collection<DbSection>();
}