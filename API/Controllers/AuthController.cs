using API.Dtos;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
	public class AuthController : BaseApiController
	{
		private readonly UserManager<User> _userManager;
		private readonly RoleManager<Role> _roleManager;
		private readonly SignInManager<User> _signInManager;
		private readonly IMapper _mapper;

		public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager, IMapper mapper)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_signInManager = signInManager;
			_mapper = mapper;
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
		{
			if (registerDto.Password != registerDto.PasswordConfirm) return BadRequest("Passwords doesn't match!");

			var user = _mapper.Map<User>(registerDto);

			user.UserName = user.UserName.ToLower();

			user.Role = await _roleManager.FindByNameAsync("User");

			var result = await _userManager.CreateAsync(user, registerDto.Password);

			if (!result.Succeeded) return BadRequest(result.Errors);

			var roleResult = await _userManager.AddToRoleAsync(user, "User");

			return roleResult.Succeeded ? new UserDto(user.UserName, user.Email) : BadRequest(roleResult.Errors);
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.FindByEmailAsync(loginDto.Email);

			if (user == null) return Unauthorized("Invalid username or password.");

			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

			return result.Succeeded ? new UserDto(user.UserName, user.Email) : Unauthorized("Invalid username or password.");
		}
	}
}
