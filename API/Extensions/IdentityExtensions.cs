using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
	public static class IdentityExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
		{
			services
					.AddIdentityCore<User>(opt =>
					{
						opt.User.RequireUniqueEmail = true;
					})
					.AddRoles<Role>()
					.AddRoleManager<RoleManager<Role>>()
					.AddSignInManager<SignInManager<User>>()
					.AddRoleValidator<RoleValidator<Role>>()
					.AddEntityFrameworkStores<DataContext>();

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
					ValidateIssuer = false,
					ValidateAudience = false
				};
			});

			services.AddAuthorization(opt =>
			{
				opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
			});

			return services;
		}
	}
}
