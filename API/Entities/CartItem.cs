using API.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	[Table("CartItems")]
	public class CartItem : ShoppingItem
	{
		public int CartId { get; set; }
	}
}
