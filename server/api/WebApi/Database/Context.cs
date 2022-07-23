using Microsoft.EntityFrameworkCore;
using WebApi.Database.Models;

namespace WebApi.Database;

#nullable disable
public class Context : DbContext
{
    public DbSet<DbWorkspace> Workspaces { get; set; }
    public DbSet<DbBoard> Boards { get; set; }
    public DbSet<DbSection> Sections { get; set; }
    public DbSet<DbCard> Cards { get; set; }

    public Context(DbContextOptions<Context> options) : base(options)
    {

    }
}