using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace API.Data
{
	public class DataContext : IdentityDbContext<User, Role, Guid>
	{
		public DataContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<Product> Products { get; set; }
		public DbSet<Collection> Collections { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			var ListConverter = new ValueConverter<List<string>, string>(
				v => JsonSerializer.Serialize(v, default),
				v => JsonSerializer.Deserialize<List<string>>(v, default));

			builder.Entity<Product>()
				.Property(p => p.Images)
				.HasConversion(ListConverter);
			builder.Entity<Product>()
				.Property(p => p.Colors)
				.HasConversion(ListConverter);
			builder.Entity<Product>()
				.Property(p => p.Sizes)
				.HasConversion(ListConverter);

			builder.Entity<Product>()
				.HasIndex(p => p.Slug)
				.IsUnique(true);

			builder.Entity<Collection>()
				.HasIndex(c => c.Name)
				.IsUnique(true);
		}
	}
}
