﻿using API.Dtos;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface IProductRepository
	{
		void CreateProduct(Product product);
		Task<Product> GetProductByIdAsync(Guid id);
		Task<ProductDto> GetProductBySlugAsync(string slug);
		Task<IEnumerable<ProductDto>> GetProductsAsync();
		void DeleteProduct(Product product);
		void UpdateProduct(Product product);
		Task<bool> SaveAllAsync();
	}
}
