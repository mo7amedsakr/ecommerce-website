using Microsoft.AspNetCore.Identity;
using System;

namespace API.Entities
{
	public class User : IdentityUser<Guid>
	{
		public Role Role { get; set; }
	}
}
