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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DbBoard>()
            .HasOne(dbBoard => dbBoard.Workspace)
            .WithMany(dbWorkspace => dbWorkspace.Boards)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DbSection>()
            .HasOne(dbSection => dbSection.Board)
            .WithMany(dbBoard => dbBoard.Sections)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DbCard>()
            .HasOne(dbCard => dbCard.Section)
            .WithMany(dbSection => dbSection.Cards)
            .OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);
    }
}