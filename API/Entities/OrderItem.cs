using API.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	[Table("OrderItems")]
	public class OrderItem : ShoppingItem
	{
		public int OrderId { get; set; }
	}
}
