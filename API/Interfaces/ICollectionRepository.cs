using API.Entities;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface ICollectionRepository
	{
		Task<Collection> GetCollectionByNameAsync(string name);
	}
}
