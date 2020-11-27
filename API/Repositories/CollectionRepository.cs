using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Repositories
{
	public class CollectionRepository : ICollectionRepository
	{
		private readonly DataContext _context;

		public CollectionRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<Collection> GetCollectionByNameAsync(string name)
		{
			return await _context.Collections.FirstOrDefaultAsync(c => c.Name == name);
		}
	}
}
