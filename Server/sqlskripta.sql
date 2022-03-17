INSERT INTO [Bolnica].[dbo].[Bolnice]([Naziv],[Adresa],[DimenzijaX],[DimenzijaY])
VALUES ('Sigma Plus','Aleksandra Medvedeva 15',5,5);

INSERT INTO [Bolnica].[dbo].[Bolnice]([Naziv],[Adresa],[DimenzijaX],[DimenzijaY])
VALUES ('Crveni Krst','Crveni Krst 3',6,6);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Petar','Markovic',50000,'Pera',1);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Jovana','Avramovic',52000,'Joka',1);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Milos','Petrovic',45000,'Somi',1);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Milica','Milivojevic',45000,'Mica',1);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Branko','Jeftic',65000,'Braki',1);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Lazar','Petrovic',55000,'Laki',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Magdalena','Zivanovic',57000,'Lena',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Vladica','Lazic',51000,'Dika',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Mihajlo','Mitrovski',59000,'Mixa',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Nadezda','Pletrovski',39000,'Nada',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Radomir','Ilic',43000,'Mixa',2);

INSERT INTO [Bolnica].[dbo].[Veterinari]([Ime],[Prezime],[Plata],[Nadimak],[BolnicaID])
VALUES ('Stefan','Markovic',52000,'Mixa',2);

INSERT INTO [Bolnica].[dbo].[Kategorije]([Naziv]) VALUES ('Nega ljubimaca');

INSERT INTO [Bolnica].[dbo].[Kategorije]([Naziv]) VALUES ('Opsti pregled ljubimaca');

INSERT INTO [Bolnica].[dbo].[Kategorije]([Naziv]) VALUES ('Ortopedija ljubimaca');

INSERT INTO [Bolnica].[dbo].[Kategorije]([Naziv]) VALUES ('Hirurgija ljubimaca');

INSERT INTO [Bolnica].[dbo].[Kategorije]([Naziv]) VALUES ('Oftamoloski pregledi i zahvati ljubimaca');

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Sisanje',500,1,'Sisanje ljubiamca po vasem izboru',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Kompletno Sisanje',1000,1,'Kompletno sisanje dlake ljubiamca',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Sisane za operaciju',350,1,'Sisanje samo dela tela potreban za operaciju',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Skracivanje noktiju',500,1,'Skracivanje noktiju ljubiamca',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Skracivanje kljunova',700,1,'Skracivanje kljunova ljubiamca',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Nega usiju',700,1,'Uredjivanje i sredjivanje usiju ljubiamca',1);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Opsti klinicki pregled',1500,1,'Opsti klinicki pregled ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Vakcinacija',1500,1,'Vakcinacija ljubiamca protiv besnila',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Sondiranje',2000,1,'Sondiranje ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Infuzija i/v',900,1,'Infuzija tipa i/v',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Infuzija s/c',1200,1,'Infuzija tipa s/c',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Kontrola',500,1,'Obicna kontrola ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Analiza brisa koze',2000,1,'Analiza brisa koze ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Vadjenje popinog praseta',1500,1,'Vadjenje popinog praseta iz disajnih organa ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Vadjenje krpelja',500,1,'Vadjenje krpelja sa koze ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Vadjenje krvi',1000,1,'Vadjenje i analiza krvi ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Uzimanje brisa',1000,1,'Uzimanje brisa ljubiamca',2);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Pregled lekara specijaliste ortopedije',2000,1,'Pregled ljubiamca od strane lekara specijaliste ortopedije',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Ortopedska repozicija',1000,1,'Ortopedska repozicija ljubiamca',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Gipsana imobilzacija',1500,1,'Gipsana imobilzacija udova ljubiamca',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Usluga gipsanja (obican gips)',400,1,'Usluga gipsanja (obican gips) udova ljubiamca',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Usluga gipsiranja (plascan gips)',1300,1,'Usluga gipsiranja (plascan gips) udova ljubiamca',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Skidanje gipsa',1300,1,'Skidanje gipsa ljubiamca',3);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Laparoskopska hirurgija',2500,1,'Operacija koja se izvodi kroz nekoliko manjih otvora na trbuhu',4);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Hirurgija mekih tkiva',2000,1,'Hirurgija mekih tkiva ljubimaca',4);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Rekonstruktivna hirurgija',4000,1,'Operacija otvorenih i zatvorenih preloma ljubimaca',4);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Onkoloska hirurgija',7000,1,'Hirurgija specijalizovana za dijagnostiku i lecenje benignih i malignih tumora ljubimaca',4);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Reparacija prolapsusa zlezde treceg ocnog kapka',2000,1,'Reparacija prolapsusa zlezde treceg ocnog kapka ljubimaca',5);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Zbrinjavanje povreda oka',2000,1,'Zbrinjavanje manjih povreda oka ljubimaca',5);

INSERT INTO [Bolnica].[dbo].[Usluge]([Naziv],[Cena],[Kolicina],[Opis],[KategorijaID])
VALUES ('Vadjenje stranog tela iz oka',2000,1,'Vadjenje stranog tela iz oka ljubimaca',5);

INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,1,0,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,1,0,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,1,0,3,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,1,0,4,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,1,1,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,1,2,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,1,2,1,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (6,1,2,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,1,2,3,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,1,3,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,1,4,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,1,4,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,1,4,4,1);

INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,2,0,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,0,1,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,2,0,3,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,0,4,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,2,0,5,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,1,3,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,2,1,5,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,2,1,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (6,2,2,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (3,2,2,5,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,2,3,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (8,2,4,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (8,2,4,5,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (2,2,5,0,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,5,2,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (1,2,5,4,1);
INSERT INTO [Bolnica].[dbo].[Sale]([BrojPacijenta],[BolnicaID],[PozicijaX],[PozicijaY],[Slobodana]) 
VALUES (4,2,5,5,1);