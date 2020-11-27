using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
	public class Product
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public string Name { get; set; }
		public string Slug { get; set; }
		public decimal Price { get; set; }
		public string Description { get; set; }
		public List<string> Images { get; set; }
		public List<string> Colors { get; set; }
		public List<string> Sizes { get; set; }
		public int Quantity { get; set; }
		public Collection Collection { get; set; }
		public int CollectionId { get; set; }
	}
}
