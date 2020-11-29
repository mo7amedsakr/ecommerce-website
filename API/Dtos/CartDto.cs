using System.Collections.Generic;

namespace API.Dtos
{
	public class CartDto
	{
		public decimal TotalPrice { get; set; }
		public IEnumerable<CartItemDto> Items { get; set; }
	}
}
