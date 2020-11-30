using System.Collections.Generic;

namespace API.Dtos
{
	public class ShoppingDto
	{
		public decimal TotalPrice { get; set; }
		public IEnumerable<ShoppingItemDto> Items { get; set; }
	}
}
