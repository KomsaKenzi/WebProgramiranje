using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Izvrsena",
                table: "Poslovi",
                newName: "Izvrsen");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Izvrsen",
                table: "Poslovi",
                newName: "Izvrsena");
        }
    }
}
