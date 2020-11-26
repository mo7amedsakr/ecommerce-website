using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
	public class AuthController : BaseApiController
	{
		private readonly UserManager<User> _userManager;
		private readonly RoleManager<Role> _roleManager;
		private readonly SignInManager<User> _signInManager;
		private readonly IMapper _mapper;
		private readonly ICookieService _cookieService;

		public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager, IMapper mapper, ICookieService cookieService)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_signInManager = signInManager;
			_mapper = mapper;
			_cookieService = cookieService;
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

			if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

			await _cookieService.SignInAsync(user, HttpContext);

			return new UserDto(user.UserName, user.Email);
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.FindByEmailAsync(loginDto.Email);

			if (user == null) return Unauthorized("Invalid username or password.");

			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

			if (!result.Succeeded) return Unauthorized("Invalid username or password.");

			await _cookieService.SignInAsync(user, HttpContext);

			return new UserDto(user.UserName, user.Email);
		}

		[HttpGet("logout")]
		public async Task Logout()
		{
			await _cookieService.SignOutAsync(HttpContext);
		}
	}
}
