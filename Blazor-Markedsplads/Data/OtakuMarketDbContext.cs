using BlazorMarkedsplads.Models;
using Microsoft.EntityFrameworkCore;
namespace BlazorMarkedsplads {

    public class OtakuMarketDbContext : DbContext
    {
        public OtakuMarketDbContext(DbContextOptions<OtakuMarketDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<Trade> Trades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trade>()
                .HasOne(t => t.Buyer)
                .WithMany(u => u.TradesAsBuyer)
                .HasForeignKey(t => t.BuyerId)
                .OnDelete(DeleteBehavior.Restrict); // предотвращает каскадные конфликты

            modelBuilder.Entity<Trade>()
                .HasOne(t => t.Seller)
                .WithMany(u => u.TradesAsSeller)
                .HasForeignKey(t => t.SellerId)
                .OnDelete(DeleteBehavior.Restrict); // предотвращает каскадные конфликты
        }
    }


}
