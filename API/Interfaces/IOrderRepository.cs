using API.Dtos;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface IOrderRepository
	{
		Task<ShoppingDto> PlaceOrderAsync(Guid userId, Cart cart);
		Task<IEnumerable<ShoppingDto>> GetAllOrdersAsync(Guid userId);
	}
}
