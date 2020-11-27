using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
	public class ProductRepository : IProductRepository
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public ProductRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public void CreateProduct(Product product)
		{
			_context.Products.Add(product);
		}

		public void DeleteProduct(Product product)
		{
			_context.Products.Remove(product);
		}

		public async Task<Product> GetProductByIdAsync(Guid id)
		{
			return await _context.Products.FindAsync(id);
		}

		public async Task<ProductDto> GetProductBySlugAsync(string slug)
		{
			return await _context.Products
				.Where(p => p.Slug == slug)
				.ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
				.FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<ProductDto>> GetProductsAsync()
		{
			return await _context.Products.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).ToListAsync();
		}

		public async Task<bool> SaveAllAsync()
		{
			return await _context.SaveChangesAsync() > 0;
		}

		public void UpdateProduct(Product product)
		{
			_context.Entry(product).State = EntityState.Modified;
		}
	}
}
