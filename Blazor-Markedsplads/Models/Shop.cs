using BlazorMarkedsplads.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlazorMarkedsplads.Models
{
    public class Shop
    {
        [Key]
        public int ShopItemId { get; set; }  // PK

        [ForeignKey(nameof(Item))]
        public int ItemId { get; set; }
        public required Item Item { get; set; }

        public int Price { get; set; }
        public int Quantity { get; set; } = 1;
        public bool Available { get; set; } = true;
    }


}
