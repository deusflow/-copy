using System.Diagnostics;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlazorMarkedsplads.Models
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }  // PK

        public required string ItemName { get; set; }
        public required string ItemType { get; set; }  // 'Avatar' или 'Weapon'
        public required string Rarity { get; set; }  // common, rare, epic, legendary
        public int? DamageMin { get; set; }
        public int? DamageMax { get; set; }
        public required string ImageUrl { get; set; }
        public required string Description { get; set; }

        // Навигации
        public ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
        public ICollection<Shop> Shops { get; set; } = new List<Shop>();
        public ICollection<Trade> Trades { get; set; } = new List<Trade>();
    }



}
