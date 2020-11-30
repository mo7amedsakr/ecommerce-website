using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.RegularExpressions;
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

		public class ProductJson
		{
			public string Name { get; set; }
			public string Slug { get; set; }
			public decimal Price { get; set; }
			public string Description { get; set; }
			public List<string> Images { get; set; }
			public List<string> Colors { get; set; }
			public List<string> Sizes { get; set; }
			public int Quantity { get; set; }
			public string CollectionName { get; set; }
		}

		public static async Task SeedProducts(DataContext context)
		{
			if (await context.Products.AnyAsync()) return;

			var productsData = await File.ReadAllTextAsync("Data/ProductsData.json");
			var productsJson = JsonSerializer.Deserialize<List<ProductJson>>(productsData);


			foreach (var product in productsJson)
			{
				var collection = await context.Collections.FirstOrDefaultAsync(c => c.Name == product.CollectionName);
				context.Products.Add(new Product
				{
					Name = product.Name,
					Slug = Regex.Replace(product.Slug, @"\/+", ""),
					Price = product.Price,
					Description = product.Description,
					Images = product.Images,
					Colors = product.Colors,
					Sizes = product.Sizes,
					Quantity = product.Quantity,
					Collection = collection
				});
			}
			await context.SaveChangesAsync();
		}
	}
}
