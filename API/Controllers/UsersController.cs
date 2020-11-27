using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
	[Authorize]
	public class UsersController : BaseApiController
	{
		private readonly IUserRepository _userRepository;

		public UsersController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		[HttpGet]
		[Authorize(policy: "RequireAdminRole")]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			return Ok(await _userRepository.GetUsersAsync());
		}

		[HttpGet("get-me")]
		public async Task<ActionResult<UserDto>> GetMe()
		{
			return await _userRepository.GetUserByIdAsync(User.GetUserId());
		}
	}
}
