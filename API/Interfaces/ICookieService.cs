using API.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface ICookieService
	{
		Task SignInAsync(User user, HttpContext httpContext);
		Task SignOutAsync(HttpContext httpContext);
	}
}
