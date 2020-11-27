﻿using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
	public class ProductsController : BaseApiController
	{
		private readonly IProductRepository _productRepository;
		private readonly ICollectionRepository _collectionRepository;
		private readonly IMapper _mapper;

		public ProductsController(IProductRepository productRepository, ICollectionRepository collectionRepository, IMapper mapper)
		{
			_productRepository = productRepository;
			_collectionRepository = collectionRepository;
			_mapper = mapper;
		}

		[HttpPost]
		[Authorize(policy: "RequireAdminRole")]
		public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
		{
			if (createProductDto.Price < 1 || createProductDto.Quantity < 1)
				return BadRequest("Price and quantity can not be less than 0");

			var product = _mapper.Map<Product>(createProductDto);

			product.Collection = await _collectionRepository.GetCollectionByNameAsync(createProductDto.CollectionName);

			_productRepository.CreateProduct(product);

			return (await _productRepository.SaveAllAsync()) ? product : BadRequest("Error creating product.");
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
		{
			return Ok(await _productRepository.GetProductsAsync());
		}

		[HttpGet("{slug}")]
		public async Task<ActionResult<ProductDto>> GetProduct(string slug)
		{
			var product = await _productRepository.GetProductBySlugAsync(slug);

			return product == null ? NotFound("No product with that slug.") : product;
		}

		[HttpDelete("{id}")]
		[Authorize(policy: "RequireAdminRole")]
		public async Task<ActionResult> DeleteProduct(Guid id)
		{
			var product = await _productRepository.GetProductByIdAsync(id);

			if (product == null) return BadRequest("No product with that id.");

			_productRepository.DeleteProduct(product);

			return (await _productRepository.SaveAllAsync()) ? NoContent() : BadRequest("Can not delete product.");
		}

		[HttpPatch("{id}")]
		[Authorize(policy: "RequireAdminRole")]
		public async Task<ActionResult<Product>> UpdateProduct(Guid id, UpdateProductDto updateProductDto)
		{
			var product = await _productRepository.GetProductByIdAsync(id);

			if (product == null) return BadRequest("No product with that id.");

			_mapper.Map(updateProductDto, product);

			if (product.Price < 1 || product.Quantity < 1)
				return BadRequest("Price and quantity can not be less than 0");

			_productRepository.UpdateProduct(product);

			return (await _productRepository.SaveAllAsync()) ? product : BadRequest("Can not delete product.");
		}
	}
}