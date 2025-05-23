using System.Diagnostics;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlazorMarkedsplads.Models
{

    public class User
    {
        [Key]
        public int Id { get; set; }  // PK

        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public DateTime JoinDate { get; set; } = DateTime.Now;
        public int Balance { get; set; } = 500;
        public string Role { get; set; } = "user";

        public ICollection<Trade> TradesAsBuyer { get; set; } = new List<Trade>();
        public ICollection<Trade> TradesAsSeller { get; set; } = new List<Trade>();

        public ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
    }


}
