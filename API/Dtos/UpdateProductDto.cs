using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
	public record UpdateProductDto(decimal Price, string Description, int Quantity);
}
