using API.Dtos;
using API.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
	public class AutoMapperProfiles:Profile
	{
		public AutoMapperProfiles()
		{
			CreateMap<User, UserDto>();
			CreateMap<RegisterDto, User>();
		}
	}
}
