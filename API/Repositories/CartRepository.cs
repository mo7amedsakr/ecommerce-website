using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
	public class CartRepository : ICartRepository
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public CartRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public void CreateCart(Cart cart)
		{
			_context.Carts.Add(cart);
		}

		public void DeleteCartItem(Cart cart, CartItem cartItem)
		{
			cart.Items.Remove(cartItem);
		}

		public async Task<Cart> GetCartAsync(Guid userId)
		{
			return await _context.Carts
				.Include(c => c.Items)
				.ThenInclude(i => i.Product)
				.FirstOrDefaultAsync(c => c.UserId == userId);
		}

		public CartItem GetCartItem(Cart cart, AddCartItemDto itemDto)
		{
			return cart.Items.FirstOrDefault(
				i => i.CartId == cart.Id &&
				i.ProductId == itemDto.ProductId &&
				i.Color == itemDto.Color &&
				i.Size == itemDto.Size
				);
		}

		public CartItem GetCartItem(Cart cart, int cartItemId)
		{
			return cart.Items.FirstOrDefault(i => i.Id == cartItemId);
		}

		public async Task<CartDto> GetUserCartAsync(Guid userId)
		{
			return await _context.Carts.Where(c => c.UserId == userId)
				.ProjectTo<CartDto>(_mapper.ConfigurationProvider)
				.FirstOrDefaultAsync();
		}

		public async Task<bool> SaveAllAsync()
		{
			return await _context.SaveChangesAsync() > 0;
		}

		public void UpdateCart(Cart cart)
		{
			cart.TotalPrice = 0;

			foreach (var item in cart.Items)
			{
				cart.TotalPrice += item.Quantity * item.Product.Price;
			}

			_context.Entry(cart).State = EntityState.Modified;
		}
	}
}
