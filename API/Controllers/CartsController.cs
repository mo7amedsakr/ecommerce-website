using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
	[Authorize]
	public class CartsController : BaseApiController
	{
		private readonly ICartRepository _cartRepository;
		private readonly IMapper _mapper;

		public CartsController(ICartRepository cartRepository, IMapper mapper)
		{
			_cartRepository = cartRepository;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<CartDto>> GetCart()
		{
			return await _cartRepository.GetUserCartAsync(User.GetUserId());
		}

		[HttpGet("add-to-cart")]
		public async Task<ActionResult<CartDto>> AddToCart(AddCartItemDto itemDto)
		{
			var cart = await _cartRepository.GetCartAsync(User.GetUserId());

			var item = _cartRepository.GetCartItem(cart, itemDto);

			if (item == null)
			{
				item = new CartItem
				{
					CartId = cart.Id,
					ProductId = itemDto.ProductId,
					Quantity = 1,
					Color = itemDto.Color,
					Size = itemDto.Size
				};
			}
			else
			{
				item.Quantity++;
			}

			cart.Items.Add(item);

			_cartRepository.UpdateCart(cart);

			return (await _cartRepository.SaveAllAsync()) ? _mapper.Map<CartDto>(cart) : BadRequest();
		}

		[HttpDelete("item/{id}")]
		public async Task<ActionResult> DeleteFromCart(int id)
		{
			var cart = await _cartRepository.GetCartAsync(User.GetUserId());
			var cartItem = _cartRepository.GetCartItem(cart, id);

			_cartRepository.DeleteCartItem(cart, cartItem);

			return (await _cartRepository.SaveAllAsync()) ? NoContent() : BadRequest("Can not delete from cart.");
		}

		[HttpPatch("item/{id}")]
		public async Task<ActionResult> UpdateCartItem(int id, UpdateCartItemDto itemDto)
		{
			var cart = await _cartRepository.GetCartAsync(User.GetUserId());
			var cartItem = _cartRepository.GetCartItem(cart, id);

			if (itemDto.Quantity > cartItem.Product.Quantity) return BadRequest("Product quantity not enough.");
			if (itemDto.Quantity < 1) return BadRequest("Quantity must be greater than 0");

			cartItem.Quantity = itemDto.Quantity;

			_cartRepository.UpdateCart(cart);

			return (await _cartRepository.SaveAllAsync()) ? NoContent() : BadRequest("Can not update cart item.");
		}
	}
}
