using BlazorMarkedsplads.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlazorMarkedsplads.Models
{
    public class Inventory
    {
        [Key]
        public int InventoryId { get; set; }  // PK

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public required User User { get; set; }

        [ForeignKey(nameof(Item))]
        public int ItemId { get; set; }
        public required Item Item { get; set; }

        public int Quantity { get; set; } = 1;
    }
}
