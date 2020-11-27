namespace API.Helpers
{
	public class ProductsParams : PaginationParams
	{
		public string CollectionName { get; set; }
		public string Price { get; set; }
		public string Search { get; set; }
	}
}
