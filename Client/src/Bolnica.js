import { Sala } from "./Sala.js";
import { ListaNarucenih } from "./ListaNarucenih.js";

export class Bolnica {
    constructor(id, naziv = "", adresa = "", dimenzijaX = 0, dimenzijaY = 0) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.dimenzijaX = dimenzijaX;
        this.dimenzijaY = dimenzijaY;
        this.container = null;
        this.listaNarucenih = null;
        this.sale = [];
        this.selektovanPosaoID = -1;
        this.selektovanaSala = null;
    }

    crtajBolnicu(host) {
        this.container = document.createElement("div");
        this.container.className = "card";
        this.container.classList.add("card2");
        host.style = "flex-direction:column;"
        host.appendChild(this.container);

        let divZaFormu = document.createElement("div");
        this.container.appendChild(divZaFormu);
        divZaFormu.className = "okvir_forme_bolnice";

        let naslov = document.createElement("h2");
        naslov.className = "naslov_bolnica";
        naslov.innerHTML = this.naziv;
        divZaFormu.appendChild(naslov);

        let labela = document.createElement("label");
        labela.className = "naslov_bolnica";
        labela.innerHTML = "Narucene usluge:";
        divZaFormu.appendChild(labela);

        let br = document.createElement("br");
        divZaFormu.appendChild(br);

        this.listaNarucenih = new ListaNarucenih();
        this.listaNarucenih.crtajListuNarucenih(divZaFormu);
        this.listaNarucenih.container.querySelector(".okvir_liste").classList.add("okvir_liste_novi");

        let divZaUkupno = document.createElement("div");
        divZaUkupno.className = "ukupno";
        divZaFormu.appendChild(divZaUkupno);

        let ukupnoSpan = document.createElement("span");
        ukupnoSpan.innerHTML = "Ukupno:";
        divZaUkupno.appendChild(ukupnoSpan);

        let ukupanIznos = document.createElement("span");
        ukupanIznos.innerHTML = "0.00";
        ukupanIznos.className = "ukupan_iznos";
        divZaUkupno.appendChild(ukupanIznos);

        labela = document.createElement("div");
        labela.className = "uputstvo_labela";
        labela.innerHTML = "Uputstvo:";
        divZaFormu.appendChild(labela);

        let divVeterinara = document.createElement("div");
        divVeterinara.className = "ukupno";
        divZaFormu.appendChild(divVeterinara);

        let veterinarSpan = document.createElement("span");
        veterinarSpan.innerHTML = "Veterinar:";
        divVeterinara.appendChild(veterinarSpan);

        let veterinarSelect = document.createElement("select");
        veterinarSelect.className = "input_box";
        veterinarSelect.classList.add("veterinar_nadimak");
        divVeterinara.appendChild(veterinarSelect);
        this.ucitajVeterinare(veterinarSelect);

        this.crtajKontrole(divZaFormu);

        fetch("https://localhost:5001/Bolnica/PreuzmiSale/" + this.id, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(listaSala => {
                    this.crtajSale(listaSala);

                });
            }
        })


    }

    crtajSale(listaSala) {

        let divZaTabelu = document.createElement("div");
        divZaTabelu.className = "okvir_tabele";
        this.container.appendChild(divZaTabelu);

        let tabelaSala = document.createElement("table");
        tabelaSala.className = "tabela_sala";
        divZaTabelu.appendChild(tabelaSala);

        let redSala;
        for (let i = 0; i < this.dimenzijaY; i++) {
            redSala = document.createElement("tr");
            tabelaSala.appendChild(redSala);
            for (let j = 0; j < this.dimenzijaX; j++) {

                let sala = new Sala(listaSala.find(s => s.xPozicija == i && s.yPozicija == j));
                this.sale.push(sala);
                sala.crtajSalu(redSala, this.listaNarucenih, this);

            }
        }
    }

    crtajKontrole(divZaFormu) {
        let okvirDugmica = document.createElement("span");
        okvirDugmica.className = "okvir_dugmica";
        divZaFormu.appendChild(okvirDugmica);

        let dugmeIzvrsi = document.createElement("button");
        dugmeIzvrsi.className = "glavno_dugme";
        dugmeIzvrsi.innerHTML = "Izvrsi";
        dugmeIzvrsi.addEventListener("click", () => {
            this.izvrsiPosao();

        });
        okvirDugmica.appendChild(dugmeIzvrsi);

        let dugmeDodaj = document.createElement("button");
        dugmeDodaj.className = "glavno_dugme";
        dugmeDodaj.innerHTML = "Dodaj";
        dugmeDodaj.addEventListener("click", () => {
            this.dodajPosao();
        });
        okvirDugmica.appendChild(dugmeDodaj);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "glavno_dugme";
        dugmeObrisi.classList.add("dugme_brisanje");
        dugmeObrisi.innerHTML = "Obrisi";
        dugmeObrisi.addEventListener("click", event => {
            this.obrisiPosao();
        });
        okvirDugmica.appendChild(dugmeObrisi);

        let dugmeNazad = document.createElement("button");
        dugmeNazad.className = "dugme";
        dugmeNazad.innerHTML = "Nazad";
        dugmeNazad.onclick = () => {
            window.open("http://127.0.0.1:5500/Client/pocetniPage.html", '_self');
        }
        okvirDugmica.appendChild(dugmeNazad);
    }

    izvrsiPosao() {
        if (this.selektovanPosaoID < 0) {
            alert("Morate selektovati zauzetu salu!");
            return;
        }
        fetch("https://localhost:5001/Posao/izvrsiPosao/" + this.selektovanPosaoID + "/" + this.selektovanaSala.id, {
            method: "PUT"
        }).then(s => {
            if (s.ok) {
                alert("Posao uspesno izvrsen!");
                this.selektovanaSala.promeniStanje();
                this.ocistiKontrole();
            }
            else
                alert("Doslo je do greske!");
        });
    }

    obrisiPosao() {
        if (this.selektovanPosaoID < 0) {
            alert("Morate selektovati zauzetu salu!");
            return;
        }
        fetch("https://localhost:5001/Posao/ObrisiPosao/" + this.selektovanPosaoID + "/" + this.selektovanaSala.id, {
            method: "DELETE"
        }).then(s => {
            if (s.ok) {
                alert("Posao uspesno obrisan!");
                this.selektovanaSala.promeniStanje();
                this.ocistiKontrole();
            }
            else
                alert("Doslo je do greske!");
        });
    }

    dodajPosao() {
        if (this.selektovanaSala == null || this.selektovanaSala.slobodana == false) {
            alert("Morate izabrati slobodanu salu");
            return;
        }
        let nadimakVeterinara = this.container.querySelector(".veterinar_nadimak").value;
        let stranicaZaDodavanje = "http://127.0.0.1:5500/Client/posaoPage.html?nazivBolnice=" + this.naziv + "&x="
            + this.selektovanaSala.x + "&y=" + this.selektovanaSala.y;
        if (nadimakVeterinara !== "")
            stranicaZaDodavanje += "&nadimakVeterinara=" + nadimakVeterinara;
        stranicaZaDodavanje = encodeURI(stranicaZaDodavanje);
        window.open(stranicaZaDodavanje, '_blank').focus();
    }

    ocistiKontrole() {
        this.container.querySelector(".ukupno .ukupan_iznos").innerHTML = "0.00";
        this.listaNarucenih.isprazniListu();
        this.container.querySelector(".lista_usluga").innerHTML = "Sala je slobodana...";
        this.container.querySelector(".uputstvo_labela").innerHTML = "Uputstvo: ";
        let veterinarSelect = this.container.querySelector(".veterinar_nadimak");
        veterinarSelect.value = "";
        veterinarSelect.disabled = false;
        this.selektovanPosaoID = -1;
    }

    ucitajVeterinare(veterinarSelect) {
        fetch("https://localhost:5001/Veterinar/PreuzmiVeterinare/" + this.id, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(veterinari => {
                    veterinari.forEach(veterinar => {
                        let veterinarOption = document.createElement("option");
                        veterinarOption.innerHTML = veterinar.ime + " " + veterinar.prezime;
                        veterinarOption.value = veterinar.nadimak;
                        veterinarSelect.appendChild(veterinarOption);
                    });
                    veterinarSelect.value = "";
                    veterinarSelect.disabled = true;
                })
            }
            else {
                alert("Doslo je do greske!");
            }
        })
    }

}