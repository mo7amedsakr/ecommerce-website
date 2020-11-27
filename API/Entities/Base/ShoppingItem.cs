namespace API.Entities.Base
{
	public abstract class ShoppingItem
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
		public string Color { get; set; }
		public string Size { get; set; }
	}
}
