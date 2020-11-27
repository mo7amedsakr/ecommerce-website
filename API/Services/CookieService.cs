using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Services
{
	public class CookieService : ICookieService
	{
		private readonly UserManager<User> _userManager;

		public CookieService(UserManager<User> userManager)
		{
			_userManager = userManager;
		}

		public async Task SignInAsync(User user, HttpContext httpContext)
		{
			var claims = new List<Claim>
				{
					new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
					new Claim(ClaimTypes.Name, user.UserName),
				};

			var roles = await _userManager.GetRolesAsync(user);

			claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

			var claimsIdentity = new ClaimsIdentity(
					claims, CookieAuthenticationDefaults.AuthenticationScheme);

			await httpContext.SignInAsync(
					CookieAuthenticationDefaults.AuthenticationScheme,
					new ClaimsPrincipal(claimsIdentity));
		}

		public async Task SignOutAsync(HttpContext httpContext)
		{
			await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
		}
	}
}
