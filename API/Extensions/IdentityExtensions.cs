using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
	public static class IdentityExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services)
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

			services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
				.AddCookie(
				CookieAuthenticationDefaults.AuthenticationScheme,
				opt =>
				{
					opt.Cookie.SameSite = SameSiteMode.None;
					opt.Cookie.Name = "token";
					opt.Cookie.HttpOnly = true;
					opt.Cookie.SecurePolicy = CookieSecurePolicy.Always;
				});

			services.AddAuthorization(opt =>
			{
				opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
			});

			return services;
		}
	}
}
