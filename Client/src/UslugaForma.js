import { ListaUsluga } from "./ListaUsluga.js";
import { Usluga } from "./Usluga.js";

export class UslugaForma {
    constructor() {
        this.listaUsluga = null;
        this.container = null;
    }

    crtajFormu(host) {
        this.container = host;
        this.listaUsluga = new ListaUsluga(this.container);
        this.listaUsluga.crtajListu(host, false, this.prikaziUslugu, this.ucitajKategorije);

        let formaZaUslugu = document.createElement("div");
        formaZaUslugu.className = "usluga_forma";
        this.container.appendChild(formaZaUslugu);

        let divZaNaziv = document.createElement("div");
        formaZaUslugu.appendChild(divZaNaziv);

        let nazivLabela = document.createElement("label");
        nazivLabela.innerHTML = "Naziv:";
        nazivLabela.className = "text_box_label"
        divZaNaziv.appendChild(nazivLabela);

        let poljeNaziv = document.createElement("input");
        poljeNaziv.type = "text";
        poljeNaziv.className = "input_box";
        divZaNaziv.appendChild(poljeNaziv);

        let divZaCenu = document.createElement("div");
        formaZaUslugu.appendChild(divZaCenu);

        let cenaLabela = document.createElement("label");
        cenaLabela.innerHTML = "Cena:";
        cenaLabela.className = "text_box_label"
        divZaCenu.appendChild(cenaLabela);

        let poljeCena = document.createElement("input");
        poljeCena.type = "number";
        poljeCena.className = "input_box";
        poljeCena.classList.add("cena_input");
        divZaCenu.appendChild(poljeCena);

        let divZaKolicinu = document.createElement("div");
        formaZaUslugu.appendChild(divZaKolicinu);

        let kolicinaLabela = document.createElement("label");
        kolicinaLabela.innerHTML = "Kolicina:";
        kolicinaLabela.className = "text_box_label"
        divZaKolicinu.appendChild(kolicinaLabela);

        let spanZaKolicinu = document.createElement("span");
        spanZaKolicinu.className = "kolicina";
        divZaKolicinu.appendChild(spanZaKolicinu);

        let poljeKolicina = document.createElement("input");
        poljeKolicina.type = "number";
        poljeKolicina.classList.add("input_box");
        poljeKolicina.classList.add("kolicina_input");
        spanZaKolicinu.appendChild(poljeKolicina);


        let divZaKategoriju = document.createElement("div");
        formaZaUslugu.appendChild(divZaKategoriju);

        let kategorijaLabela = document.createElement("label");
        kategorijaLabela.innerHTML = "Kategorija usluga:";
        kategorijaLabela.className = "text_box_label"
        divZaKategoriju.appendChild(kategorijaLabela);

        let poljeZaKategoriju = document.createElement("select");
        poljeZaKategoriju.classList.add("input_box");
        poljeZaKategoriju.classList.add("kategorija_select");
        divZaKategoriju.appendChild(poljeZaKategoriju);

        let uputstvoText = document.createElement("textarea");
        uputstvoText.classList.add("input_box");
        uputstvoText.classList.add("dodatno_uputstvo");
        uputstvoText.placeholder = "Opis usluge...";
        formaZaUslugu.appendChild(uputstvoText);

        let okvirDugmica = document.createElement("span");
        okvirDugmica.className = "okvir_dugmica";
        formaZaUslugu.appendChild(okvirDugmica);

        let dugmeDodaj = document.createElement("button");
        dugmeDodaj.className = "glavno_dugme";
        dugmeDodaj.innerHTML = "Dodaj stavku";
        dugmeDodaj.addEventListener("click", () => {
            this.dodajUslugu();
        });
        okvirDugmica.appendChild(dugmeDodaj);

        let dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.className = "glavno_dugme";
        dugmeIzmeni.innerHTML = "Izmeni stavku";
        dugmeIzmeni.addEventListener("click", () => {
            this.izmeniUslugu(this.listaUsluga.selektovanaUsluga, this.listaUsluga.listaKategorija);
        });
        okvirDugmica.appendChild(dugmeIzmeni);

        let dugmeUkloni = document.createElement("button");
        dugmeUkloni.className = "glavno_dugme";
        dugmeUkloni.classList.add("dugme_brisanje");
        dugmeUkloni.innerHTML = "Ukloni stavku";
        dugmeUkloni.addEventListener("click", event => {
            if (this.listaUsluga.selektovanaUsluga == null || this.listaUsluga.selektovanaUsluga == undefined)
                alert("Morate selektovati uslugu!");
            else {
                this.obrisiUslugu(this.listaUsluga.selektovanaUsluga.id);
            }
        });
        okvirDugmica.appendChild(dugmeUkloni);

        let dugmeNazad = document.createElement("button");
        dugmeNazad.className = "dugme";
        dugmeNazad.innerHTML = "Nazad";
        dugmeNazad.onclick = () => {
            window.open("http://127.0.0.1:5500/Client/pocetniPage.html", '_self');
        }
        okvirDugmica.appendChild(dugmeNazad);
    }


    prikaziUslugu(usluga) {

        let nazivPolje = document.querySelector('input[type="text"]');
        nazivPolje.value = usluga.naziv;

        let cenaPolje = document.querySelector('.cena_input');
        cenaPolje.value = parseFloat(usluga.cena).toFixed(2);

        let kolicinaPolje = document.querySelector('.kolicina_input');
        kolicinaPolje.value = usluga.kolicina;

        let poljeOpis = document.querySelector('textarea');
        poljeOpis.value = usluga.opis;

    }

    ucitajKategorije(lista) {
        let kategorijaOption;
        let selectBoxKategorija = document.querySelector(".kategorija_select")
        lista.forEach(kategorija => {
            kategorijaOption = document.createElement("option");
            kategorijaOption.innerHTML = kategorija.naziv;
            kategorijaOption.value = kategorija.id;
            selectBoxKategorija.appendChild(kategorijaOption);
        });
    }

    dodajUslugu() {
        let naziv = this.container.querySelector('input[type="text"]').value;
        let cena = this.container.querySelector('.cena_input').value;
        let kolicina = this.container.querySelector('.kolicina_input').value;
        let kategorijaID = this.container.querySelector('.kategorija_select').value;
        let opis = this.container.querySelector('textarea').value;
        let postRequest = `https://localhost:5001/Usluga/DodajUslugu?naziv=${naziv}&cena=${parseInt(cena)}&kolicina=${kolicina}&opis=${opis}&idKategorije=${kategorijaID}`;
        postRequest = encodeURI(postRequest);
        fetch(postRequest, { method: "POST" })
            .then(s => {
                if (s.ok) {
                    alert("Usluga je uspesno dodata!");
                    s.json().then(idDodatog => {
                        if (this.container.querySelector('.kategorija').value == kategorijaID) {
                            let novaUsluga = new Usluga(idDodatog, naziv, parseInt(cena), kategorijaID, kolicina, 0, opis);
                            novaUsluga.prikaziUslugu(false, this.prikaziUslugu, this.listaUsluga);
                        }
                    })
                }
                else
                    alert("Doslo je do greske!");
            });
    }

    izmeniUslugu(selektovanaUsluga, listaKategorija) {
        if (selektovanaUsluga == null || selektovanaUsluga == undefined) {
            alert("Morate prethodno selektovati neku uslugu!");
        }
        else {
            let naziv = this.container.querySelector('input[type="text"]').value;
            let cena = this.container.querySelector('.cena_input').value;
            let kolicina = this.container.querySelector('.kolicina_input').value;
            let kategorijaID = this.container.querySelector('.kategorija_select').value;
            let kategorijaNaziv = listaKategorija.find(k => k.id == kategorijaID).naziv;
            let opis = this.container.querySelector('textarea').value;
            var zaSlanje = {
                id: selektovanaUsluga.id,
                naziv: naziv,
                cena: parseInt(cena),
                kolicina: kolicina,
                opis: opis,
                kategorija: {
                    id: kategorijaID,
                    naziv: kategorijaNaziv
                }
            };
            fetch("https://localhost:5001/Usluga/PromeniUslugu", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(zaSlanje)
            }).then(s => {
                if (s.ok) {
                    alert("Usluga uspesno izmenjen!");
                    this.listaUsluga.isprazniListu();
                    this.listaUsluga.ucitajUsluge(kategorijaID, false, this.prikaziUslugu);
                    this.container.querySelector('.kategorija').value = kategorijaID;
                }
                else
                    alert("Doslo je do greske!");
            });

        }

    }

    obrisiUslugu(idUsluge) {
        fetch("https://localhost:5001/Usluga/obrisiUslugu/" + idUsluge, {
            method: "DELETE"
        }).then(s => {
            if (s.ok) {
                alert("Usluga je uspesno obrisana!");
                let usluga = this.listaUsluga.usluge
                    .find(p => p.id == idUsluge);
                this.listaUsluga.listaContainer.removeChild(usluga.container);
            }
            else
                alert("Doslo je do greske prilikom brisanja!");
        })
    }
}