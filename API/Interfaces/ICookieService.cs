using API.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface ICookieService
	{
		Task SignInAsync(User user, HttpContext httpContext);
		Task SignOutAsync(HttpContext httpContext);
	}
}
