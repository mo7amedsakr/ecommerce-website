using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
	public record LoginDto(
		[Required][EmailAddress] string Email,
		[Required][StringLength(255, MinimumLength = 8)] string Password
		);
}
