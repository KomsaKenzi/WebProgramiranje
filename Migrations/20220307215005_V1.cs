using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Poslovi_Doktori_DoktorID",
                table: "Poslovi");

            migrationBuilder.DropTable(
                name: "Doktori");

            migrationBuilder.DropColumn(
                name: "Jedinica",
                table: "Usluge");

            migrationBuilder.DropColumn(
                name: "DozvoljenoPusenje",
                table: "Sale");

            migrationBuilder.DropColumn(
                name: "Napojnica",
                table: "Poslovi");

            migrationBuilder.RenameColumn(
                name: "Slobodan",
                table: "Sale",
                newName: "Slobodana");

            migrationBuilder.RenameColumn(
                name: "BrojOsoba",
                table: "Sale",
                newName: "BrojPacijenta");

            migrationBuilder.RenameColumn(
                name: "DoktorID",
                table: "Poslovi",
                newName: "VeterinarID");

            migrationBuilder.RenameIndex(
                name: "IX_Poslovi_DoktorID",
                table: "Poslovi",
                newName: "IX_Poslovi_VeterinarID");

            migrationBuilder.AlterColumn<int>(
                name: "Kolicina",
                table: "Usluge",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.CreateTable(
                name: "Veterinari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Nadimak = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Plata = table.Column<int>(type: "int", nullable: false),
                    BolnicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veterinari", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Veterinari_Bolnice_BolnicaID",
                        column: x => x.BolnicaID,
                        principalTable: "Bolnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Veterinari_BolnicaID",
                table: "Veterinari",
                column: "BolnicaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Poslovi_Veterinari_VeterinarID",
                table: "Poslovi",
                column: "VeterinarID",
                principalTable: "Veterinari",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Poslovi_Veterinari_VeterinarID",
                table: "Poslovi");

            migrationBuilder.DropTable(
                name: "Veterinari");

            migrationBuilder.RenameColumn(
                name: "Slobodana",
                table: "Sale",
                newName: "Slobodan");

            migrationBuilder.RenameColumn(
                name: "BrojPacijenta",
                table: "Sale",
                newName: "BrojOsoba");

            migrationBuilder.RenameColumn(
                name: "VeterinarID",
                table: "Poslovi",
                newName: "DoktorID");

            migrationBuilder.RenameIndex(
                name: "IX_Poslovi_VeterinarID",
                table: "Poslovi",
                newName: "IX_Poslovi_DoktorID");

            migrationBuilder.AlterColumn<float>(
                name: "Kolicina",
                table: "Usluge",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Jedinica",
                table: "Usluge",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DozvoljenoPusenje",
                table: "Sale",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Napojnica",
                table: "Poslovi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Doktori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BolnicaID = table.Column<int>(type: "int", nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Nadimak = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Plata = table.Column<int>(type: "int", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doktori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Doktori_Bolnice_BolnicaID",
                        column: x => x.BolnicaID,
                        principalTable: "Bolnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Doktori_BolnicaID",
                table: "Doktori",
                column: "BolnicaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Poslovi_Doktori_DoktorID",
                table: "Poslovi",
                column: "DoktorID",
                principalTable: "Doktori",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
