using API.Dtos;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
	[Authorize]
	public class OrdersController : BaseApiController
	{
		private readonly IOrderRepository _orderRepository;
		private readonly ICartRepository _cartRepository;

		public OrdersController(IOrderRepository orderRepository, ICartRepository cartRepository)
		{
			_orderRepository = orderRepository;
			_cartRepository = cartRepository;
		}

		[HttpPost]
		public async Task<ActionResult<ShoppingDto>> PlaceOrder()
		{
			var userId = User.GetUserId();
			var cart = await _cartRepository.GetCartAsync(userId);

			if (cart.TotalPrice < 1m || cart.Items.Count < 1)
				return BadRequest("Cart is empty.");

			return await _orderRepository.PlaceOrderAsync(userId, cart);
		}

		[HttpGet]
		public async Task<ActionResult<ShoppingDto>> GetOrders()
		{
			return Ok(await _orderRepository.GetAllOrdersAsync(User.GetUserId()));
		}
	}
}
