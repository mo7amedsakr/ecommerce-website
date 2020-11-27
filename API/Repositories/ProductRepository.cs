using API.Data;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
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

		public async Task<PagedList<ProductDto>> GetProductsAsync(ProductsParams productsParams)
		{
			var productsQuery = _context.Products.ProjectTo<ProductDto>(_mapper.ConfigurationProvider);

			if (!string.IsNullOrEmpty(productsParams.CollectionName))
			{
				productsQuery = productsQuery.Where(p => p.CollectionName == productsParams.CollectionName);
			}

			productsQuery = productsParams.Price switch
			{
				"high" => productsQuery.OrderByDescending(p => (double)p.Price),
				"low" => productsQuery.OrderBy(p => (double)p.Price),
				_ => productsQuery
			};

			return await PagedList<ProductDto>.CreateAsync(productsQuery, productsParams.PageNumber, productsParams.PageSize);
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
