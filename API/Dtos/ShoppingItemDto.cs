namespace API.Dtos
{
	public class ShoppingItemDto
	{
		public int Id { get; set; }
		public int Quantity { get; set; }
		public string Color { get; set; }
		public string Size { get; set; }
		public ShoppingItemProductDto Product { get; set; }
	}
}
