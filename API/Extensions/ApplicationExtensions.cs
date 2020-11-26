using API.Data;
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
			services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

			services.AddDbContext<DataContext>(options =>
			{
				options.UseSqlite(config.GetConnectionString("DefaultConnection"));

			});

			return services;
    }

  }
}
