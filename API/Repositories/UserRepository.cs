using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public UserRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<UserDto> GetUserByIdAsync(Guid id)
		{
			return await _context.Users
				.Where(u => u.Id == id)
				.ProjectTo<UserDto>(_mapper.ConfigurationProvider)
				.FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<User>> GetUsersAsync()
		{
			return await _context.Users.Include(u => u.Role).ToListAsync();
		}
	}
}
