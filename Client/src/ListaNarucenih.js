import { Usluga } from "./Usluga.js";

export class ListaNarucenih {
    constructor() {
        this.naruceneUsluge = [];
        this.container = null;
        this.naruceneContainer = null;
    }

    crtajListuNarucenih(host) {
        this.container = host;

        let okvirListe = document.createElement("div");
        okvirListe.className = "okvir_liste";
        this.container.appendChild(okvirListe);

        this.naruceneContainer = document.createElement("ul");
        this.naruceneContainer.className = "lista_usluga";
        okvirListe.appendChild(this.naruceneContainer);
    }

    dodajUslugaUListu(usluga) {
        let uslugaUListi = this.naruceneUsluge.filter(p => p.id == usluga.id);
        if (uslugaUListi.length == 0)
            this.naruceneUsluge.push(new Usluga(usluga.id, usluga.naziv, usluga.cena, usluga.kategorija, usluga.kolicina, usluga.brojIzabranih));

        else
        uslugaUListi[0].uvecajBrojIzabranih();

    }

    ukloniUsluguIzListe(usluga) {
        let trazenaUsluga = this.naruceneUsluge.find(p => p.id === usluga.id);
        if (trazenaUsluga === null || trazenaUsluga === undefined)
            return;
        if (trazenaUsluga.brojIzabranih === 1) {
            this.naruceneUsluge = this.naruceneUsluge
                .filter(p => p != trazenaUsluga);
        }
        else if (trazenaUsluga.brojIzabranih > 1) {
            trazenaUsluga.umanjiBrojIzabranih();
        }
    }

    prikaziListuNarucenih() {
        this.isprazniListu();
        this.naruceneUsluge.forEach(usluga => {
            usluga.prikaziUsluguShort(this);
            /*let stavkaListe = document.createElement("li");
            stavkaListe.className = "stavka_menija";
            this.naruceneContainer.appendChild(stavkaListe);
            let nazivStavke = document.createElement("span");
            nazivStavke.innerHTML = proizvod.naziv;
            stavkaListe.appendChild(nazivStavke);
            let cenaStavke = document.createElement("span");
            cenaStavke.className = "cena";
            cenaStavke.innerHTML = proizvod.cena + ".00 x " + proizvod.brojIzabranih;
            stavkaListe.appendChild(cenaStavke);*/
        });

    }

    isprazniListu() {
        while (this.naruceneContainer.firstChild)
            this.naruceneContainer.removeChild(this.naruceneContainer.firstChild);
    }
}