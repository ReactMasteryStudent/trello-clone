using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace WebApi.Database.Models;

#nullable disable
public class DbWorkspace
{
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<DbBoard> Boards { get; set; } = new Collection<DbBoard>();
}