﻿using System.Collections.Generic;

namespace API.Dtos
{
	public record ProductDto(
		int Id,
		string Name,
		string Slug,
		decimal Price,
		int Quantity,
		string Description,
		IEnumerable<string> Images,
		IEnumerable<string> Colors,
		IEnumerable<string> Sizes,
		string CollectionName
		);
}
