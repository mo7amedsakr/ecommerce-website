using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
	public record RegisterDto(
		[Required] string UserName,
		[Required][StringLength(255, MinimumLength = 8)] string Password,
		[Required][StringLength(255, MinimumLength = 8)] string PasswordConfirm,
		[Required][EmailAddress] string Email
		);
}
