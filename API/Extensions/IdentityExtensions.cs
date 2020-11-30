using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

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
			.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, opt =>
			{
				opt.Cookie.SameSite = SameSiteMode.None;
				opt.Cookie.Name = "token";
				opt.Cookie.HttpOnly = true;
				opt.ExpireTimeSpan = TimeSpan.FromMinutes(1);
				opt.Events = new CookieAuthenticationEvents
				{
					OnRedirectToLogin = redirectContext =>
					{
						redirectContext.HttpContext.Response.StatusCode = 401;
						return Task.CompletedTask;
					}
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
