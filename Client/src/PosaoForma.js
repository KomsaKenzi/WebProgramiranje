import { ListaNarucenih } from "./ListaNarucenih.js";
import { ListaUsluga } from "./ListaUsluga.js";

export class PosaoForma {
    constructor() {
        this.listaUsluga = null;
        this.container = null;
        this.ukupanIznos = null;
        this.naruceneContainer = null;
        this.listaNarucenih = null;
    }

    crtajFormuZaPosao(host) {
        this.container = host;
        this.listaUsluga = new ListaUsluga(this);
        this.listaUsluga.crtajListu(host);

        let posaoForma = document.createElement("div");
        posaoForma.className = "posao_forma";
        this.container.appendChild(posaoForma);

        let naslov = document.createElement("h2");
        naslov.innerHTML = "Posao:";
        posaoForma.appendChild(naslov);

        let br = document.createElement("br");
        posaoForma.appendChild(br);

        this.listaNarucenih = new ListaNarucenih();
        this.listaNarucenih.crtajListuNarucenih(posaoForma);

        let divZaUkupno = document.createElement("div");
        divZaUkupno.className = "ukupno";
        posaoForma.appendChild(divZaUkupno);

        let ukupnoSpan = document.createElement("span");
        ukupnoSpan.innerHTML = "Ukupno:";
        divZaUkupno.appendChild(ukupnoSpan);

        this.ukupanIznos = document.createElement("span");
        this.ukupanIznos.innerHTML = "0.00";
        this.ukupanIznos.className = "ukupan_iznos";
        divZaUkupno.appendChild(this.ukupanIznos);

        let uputstvoText = document.createElement("textarea");
        uputstvoText.classList.add("input_box");
        uputstvoText.classList.add("dodatno_uputstvo");
        uputstvoText.placeholder = "Unesite dodatno uputstvo (po potrebi)...";
        posaoForma.appendChild(uputstvoText);

        let okvirDugmica = document.createElement("span");
        okvirDugmica.className = "okvir_dugmica";
        posaoForma.appendChild(okvirDugmica);

        let dugmeNaruci = document.createElement("button");
        dugmeNaruci.className = "glavno_dugme";
        dugmeNaruci.innerHTML = "Naruci";
        dugmeNaruci.addEventListener("click", event => this.proslediPosao());
        okvirDugmica.appendChild(dugmeNaruci);

    }

    dodajUsluguUPosao(usluga) {
        this.listaNarucenih.dodajUslugaUListu(usluga);
        this.prikaziNarucene();
    }

    ukloniUsluguIzPosla(usluga) {
        this.listaNarucenih.ukloniUsluguIzListe(usluga);
        this.prikaziNarucene();
    }

    prikaziNarucene() {
        this.listaNarucenih.prikaziListuNarucenih();
        this.ukupanIznos.innerHTML = this.listaNarucenih.naruceneUsluge
            .reduce((acc, narucenaUsluga) =>
                acc += narucenaUsluga.brojIzabranih * narucenaUsluga.cena, 0) + ",00";
    }

    proslediPosao() {
        if (this.listaNarucenih.naruceneUsluge.length === 0) {
            alert("Morate izabrati bar jednu uslugu!");
            return;
        }
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const salaX = parseInt(params.x ?? -1);
        const salaY = parseInt(params.y ?? -1);
        const nazivBolnice = params.nazivBolnice ?? "";
        const nadimakVeterinara = params.nadimakVeterinara ?? null;
        let postRequest = encodeURI("https://localhost:5001/Posao/DodajPosao/"
            + nazivBolnice + "/" + salaX + "/" + salaY + "?");

        this.listaNarucenih.naruceneUsluge.forEach((usluga) => {
            for (let i = 0; i < usluga.brojIzabranih; i++) {
                postRequest += "usluge="
                    + usluga.id;
                postRequest += "&";
            }
        });
        if (nadimakVeterinara !== null) {
            postRequest = postRequest + "nadimakVeterinara=" + nadimakVeterinara + "&";
        }
        let dodatnoUputstvo = document.querySelector(".dodatno_uputstvo").value;
        postRequest += "uputstvo="
            + encodeURI(dodatnoUputstvo);
        this.listaNarucenih.naruceneUsluge = [];
        fetch(postRequest, { method: "POST" })
            .then(s => {
                console.log(s); 
                if (s.ok) {
                    alert("Posao je prosledjen!");
                    window.opener.location.reload(false);
                    window.close();       
                }
                else
                    alert("Posao nije uspesno prosledjen!");
            });
    }

}