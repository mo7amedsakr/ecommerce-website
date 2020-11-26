using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	public class User : IdentityUser<Guid>
	{
		public Role Role { get; set; }
	}
}
