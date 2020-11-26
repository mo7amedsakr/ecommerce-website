using System;
using System.Security.Claims;

namespace API.Extensions
{
	public static class ClaimsPrincipleExtensions
	{
		public static string GetUserName(this ClaimsPrincipal user)
		{
			return user.FindFirst(ClaimTypes.Name)?.Value;
		}
		public static Guid GetUserId(this ClaimsPrincipal user)
		{
			return new Guid(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
		}

	}
}
