namespace API.Dtos
{
	public class CartItemDto
	{
		public int Id { get; set; }
		public int Quantity { get; set; }
		public string Color { get; set; }
		public string Size { get; set; }
		public CartItemProductDto Product { get; set; }
	}
}
