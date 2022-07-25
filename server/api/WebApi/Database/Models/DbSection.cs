using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace WebApi.Database.Models;

#nullable disable
public class DbSection
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Position { get; set; }
    public virtual ICollection<DbCard> Cards { get; set; } = new Collection<DbCard>();

    // Relations
    public virtual DbBoard Board { get; set; }
}