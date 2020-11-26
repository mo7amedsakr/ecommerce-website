using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
	public class Seed
	{
		public static async Task SeedRoles(RoleManager<Role> roleManager)
		{
			if (await roleManager.Roles.AnyAsync()) return;

			var roles = new List<Role> { new Role { Name = "User" }, new Role { Name = "Admin" } };

			foreach (var role in roles)
			{
				await roleManager.CreateAsync(role);
			}

		}
	}
}
