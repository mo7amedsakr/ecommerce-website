using API.Data;
using API.Interfaces;
using API.Repositories;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
	public static class ApplicationExtensions
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
		{
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<ICollectionRepository, CollectionRepository>();
			services.AddScoped<IProductRepository, ProductRepository>();
			services.AddScoped<ICartRepository, CartRepository>();
			services.AddScoped<IOrderRepository, OrderRepository>();
			services.AddScoped<ICookieService, CookieService>();

			services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

			services.AddDbContext<DataContext>(options =>
			{
				options.UseSqlite(config.GetConnectionString("DefaultConnection"));

			});

			return services;
		}

	}
}
