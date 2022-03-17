import { Kategorija } from "./Kategorija.js";
import { Usluga } from "./Usluga.js";

export class ListaUsluga {
    constructor(posaoForma = null) {
        this.usluge = [];
        this.container = null;
        this.listaContainer = null;
        this.listaKategorija = [];
        this.posaoForma = posaoForma;
        this.selektovanaUsluga = null;
    }

    crtajListu(host, saKontrolama = true, naKlik = undefined, naUcitavanje = undefined) {
        let divZaListu = document.createElement("div");
        host.appendChild(divZaListu);
        this.container = host;

        let okvirKategorije = document.createElement("div");
        okvirKategorije.className = "okvir_kategorije";
        okvirKategorije.innerHTML = "Kategorija:";
        divZaListu.appendChild(okvirKategorije);

        let kategorijaSelect = document.createElement("select");
        kategorijaSelect.name = "kategorija_usluga";
        kategorijaSelect.classList.add("input_box");
        kategorijaSelect.classList.add("kategorija");
        okvirKategorije.appendChild(kategorijaSelect);

        let br = document.createElement("br");
        divZaListu.appendChild(br);

        let okvirListe = document.createElement("div");
        okvirListe.className = "okvir_liste";
        divZaListu.appendChild(okvirListe);

        let listaUsluga = document.createElement("ul");
        listaUsluga.className = "lista_usluga";
        okvirListe.appendChild(listaUsluga);
        this.listaContainer = listaUsluga;

        this.ucitajKategorije(kategorijaSelect, saKontrolama, naKlik, naUcitavanje);

    }

    ucitajKategorije(selectBox, saKontrolama = true, naKlik = undefined, naUcitavanje = undefined) {

        fetch("https://localhost:5001/Usluga/PreuzmiKategorije", {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    let kategorijaOption;
                    data.forEach(kategorija => {
                        kategorijaOption = document.createElement("option");
                        kategorijaOption.innerHTML = kategorija.naziv;
                        kategorijaOption.value = kategorija.id;
                        selectBox.appendChild(kategorijaOption);
                        this.listaKategorija.push(new Kategorija(kategorija.id, kategorija.naziv));
                    });
                    if (!saKontrolama) {
                        naUcitavanje(this.listaKategorija);
                    }
                    this.ucitajUsluge(this.listaKategorija[0].id, saKontrolama, naKlik);
                    selectBox.onchange = ev => {
                        this.isprazniListu();
                        this.ucitajUsluge(selectBox.value, saKontrolama, naKlik);
                    }
                });
            }
        });
    }

    ucitajUsluge(kategorijaID, saKontrolama = true, naKlik = undefined) {
        fetch("https://localhost:5001/Usluga/PreuzmiUsluge/" + kategorijaID, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    this.usluge = [];
                    let izabranaUsluga;
                    let brojIzabranih = 0;
                    data.forEach(usluga => {
                        if (saKontrolama) {
                            izabranaUsluga = this.posaoForma.listaNarucenih.naruceneUsluge
                                .filter(p => p.id === usluga.id);
                            if (izabranaUsluga.length === 0)
                                brojIzabranih = 0;
                            else
                                brojIzabranih = izabranaUsluga[0].brojIzabranih;
                        }
                        this.usluge.push(new Usluga(
                            usluga.id,
                            usluga.naziv,
                            usluga.cena,
                            kategorijaID,
                            usluga.kolicina,
                            brojIzabranih,
                            usluga.opis
                        ));
                    });
                    this.prikaziUsluge(saKontrolama, naKlik);
                });
            }
        });
    }

    prikaziUsluge(saKontrolama = true, naKlik = undefined) {
        this.usluge.forEach(usluga => {
            usluga.prikaziUslugu(saKontrolama, naKlik, this);
            
        });
    }

    isprazniListu() {
        while (this.listaContainer.firstChild)
            this.listaContainer.removeChild(this.listaContainer.firstChild);
    }

}