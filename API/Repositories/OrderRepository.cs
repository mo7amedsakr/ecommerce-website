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
	public class OrderRepository : IOrderRepository
	{
		private readonly DataContext _context;
		private readonly ICartRepository _cartRepository;
		private readonly IMapper _mapper;

		public OrderRepository(DataContext context, ICartRepository cartRepository, IMapper mapper)
		{
			_context = context;
			_cartRepository = cartRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ShoppingDto>> GetAllOrdersAsync(Guid userId)
		{
			return await _context.Orders
				.Where(o => o.UserId == userId)
				.ProjectTo<ShoppingDto>(_mapper.ConfigurationProvider)
				.ToListAsync();
		}

		public async Task<ShoppingDto> PlaceOrderAsync(Guid userId, Cart cart)
		{
			await using var transaction = await _context.Database.BeginTransactionAsync();

			try
			{
				var order = new Order
				{
					UserId = userId,
					TotalPrice = cart.TotalPrice,
					Items = new List<OrderItem>()
				};

				cart.TotalPrice = 0m;

				foreach (var item in cart.Items)
				{
					order.Items.Add(new OrderItem
					{
						Product = item.Product,
						Color = item.Color,
						Size = item.Size,
						Quantity = item.Quantity
					});
				}

				_context.Orders.Add(order);
				await _context.SaveChangesAsync();

				_context.RemoveRange(cart.Items);
				_cartRepository.Update(cart);

				await _context.SaveChangesAsync();
				await transaction.CommitAsync();

				return _mapper.Map<ShoppingDto>(order);
			}
			catch (Exception e)
			{
				await transaction.RollbackAsync();
				throw new ApplicationException(e.Message);
			}
		}
	}
}
