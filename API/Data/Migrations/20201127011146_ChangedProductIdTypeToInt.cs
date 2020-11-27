﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace API.Data.Migrations
{
	public partial class ChangedProductIdTypeToInt : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<int>(
					name: "Id",
					table: "Products",
					type: "INTEGER",
					nullable: false,
					oldClrType: typeof(Guid),
					oldType: "TEXT")
					.Annotation("Sqlite:Autoincrement", true);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<Guid>(
					name: "Id",
					table: "Products",
					type: "TEXT",
					nullable: false,
					oldClrType: typeof(int),
					oldType: "INTEGER")
					.OldAnnotation("Sqlite:Autoincrement", true);
		}
	}
}
