using API.Dtos;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
	public interface IUserRepository
	{
		Task<IEnumerable<User>> GetUsersAsync();
		Task<UserDto> GetUserByIdAsync(Guid id);
	}
}
