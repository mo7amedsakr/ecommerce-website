using API.Dtos;
using API.Entities;
using AutoMapper;
using System.Text.RegularExpressions;

namespace API
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles()
		{
			CreateMap<User, UserDto>();
			CreateMap<RegisterDto, User>();

			CreateMap<Product, ProductDto>()
				.ForMember(dest => dest.CollectionName, opt => opt.MapFrom(src => src.Collection.Name));
			CreateMap<CreateProductDto, Product>()
				.ForMember(dest => dest.Slug, opt => opt.MapFrom(src => Regex.Replace(src.Name, @"[\s\/]+", "-").ToLower()));
			CreateMap<UpdateProductDto, Product>();
			CreateMap<Product, ShoppingItemProductDto>()
				.ForMember(dest => dest.Image, opt => opt.MapFrom(p => p.Images[0]));

			CreateMap<Cart, ShoppingDto>();
			CreateMap<CartItem, ShoppingItemDto>();

			CreateMap<Order, ShoppingDto>();
			CreateMap<OrderItem, ShoppingItemDto>();
		}
	}
}
