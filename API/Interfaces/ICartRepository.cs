using API.Dtos;
using API.Entities;
using System;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface ICartRepository
	{
		void CreateCart(Cart cart);
		void UpdateCartPrice(Cart cart);
		void Update(Cart cart);
		void DeleteCartItem(Cart cart, CartItem cartItem);
		Task<Cart> GetCartAsync(Guid userId);
		Task<ShoppingDto> GetUserCartAsync(Guid userId);
		CartItem GetCartItem(Cart cart, AddCartItemDto itemDto);
		CartItem GetCartItem(Cart cart, int cartItemId);
		void DeleteCartItems(Cart cart);
		Task<bool> SaveAllAsync();
	}
}
