using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
	public class Seed
	{
		public static async Task AddAdminUser(UserManager<User> userManager, RoleManager<Role> roleManager)
		{
			if ((await userManager.FindByEmailAsync("admin@admin.com")) == null)
			{
				var user = new User { Email = "admin@admin.com", UserName = "admin", Role = await roleManager.FindByNameAsync("Admin") };
				await userManager.CreateAsync(user, "Pa$$w0rd");
				await userManager.AddToRoleAsync(user, "Admin");
			}
		}
		public static async Task SeedRoles(RoleManager<Role> roleManager)
		{
			if (await roleManager.Roles.AnyAsync()) return;

			var roles = new List<Role> { new Role { Name = "User" }, new Role { Name = "Admin" } };

			foreach (var role in roles)
			{
				await roleManager.CreateAsync(role);
			}
		}

		public static async Task SeedCollections(DataContext context)
		{
			if (await context.Collections.AnyAsync()) return;

			var collections = new List<Collection> {
				new Collection { Name = "accessories" },
				new Collection { Name = "footwear" },
				new Collection { Name = "pants" },
				new Collection { Name = "tshirts" }
			};

			await context.Collections.AddRangeAsync(collections);

			await context.SaveChangesAsync();
		}
	}
}
