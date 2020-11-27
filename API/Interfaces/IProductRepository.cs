using API.Dtos;
using API.Entities;
using API.Helpers;
using System;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface IProductRepository
	{
		void CreateProduct(Product product);
		Task<Product> GetProductByIdAsync(Guid id);
		Task<ProductDto> GetProductBySlugAsync(string slug);
		Task<PagedList<ProductDto>> GetProductsAsync(ProductsParams productsParams);
		void DeleteProduct(Product product);
		void UpdateProduct(Product product);
		Task<bool> SaveAllAsync();
	}
}
