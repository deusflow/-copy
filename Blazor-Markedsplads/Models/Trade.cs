using BlazorMarkedsplads.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazorMarkedsplads.Models
{
    public class Trade
    {
        [Key]
        public int TradeId { get; set; }  // PK

        [ForeignKey(nameof(Seller))]
        public int? SellerId { get; set; }
        public User? Seller { get; set; }

        [ForeignKey(nameof(Buyer))]
        public int? BuyerId { get; set; }
        public User? Buyer { get; set; }

        [ForeignKey(nameof(Item))]
        public int ItemId { get; set; }
        public required Item Item { get; set; }

        public int Price { get; set; }
        public DateTime TradeDate { get; set; } = DateTime.Now;
    }


}
