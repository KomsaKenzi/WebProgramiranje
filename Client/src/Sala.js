export class Sala {
    constructor(salaIzBaze) {
        if (salaIzBaze != null && salaIzBaze != undefined) {
            this.id = salaIzBaze.id;
            this.brojPacijenta = salaIzBaze.brojPacijenta;
            this.x = salaIzBaze.xPozicija;
            this.y = salaIzBaze.yPozicija;
            this.slobodana = salaIzBaze.slobodana;
            this.imaSale = true;
            this.bolnica = null;
        }
        else
            this.imaSale = false;
        this.container = null;
    }

    crtajSalu(host, lista, bolnica) {

        this.bolnica = bolnica;

        let salaTD = document.createElement("td");
        host.appendChild(salaTD);
        this.container = salaTD;

        if (this.imaSale) {
            let salaDugme = document.createElement("button");
            salaDugme.className = "dugme_sala";
            salaDugme.classList.add(this.slobodana ? "slobodana_sala" : "zauzeta_sala");
            salaDugme.innerHTML = this.brojPacijenta;
            salaTD.appendChild(salaDugme);
            salaDugme.addEventListener("click", () => {
                if (!this.slobodana)
                    this.ucitajPosao(lista);
                else {
                    this.bolnica.ocistiKontrole();
                }

                this.bolnica.selektovanaSala = this;

            })
        }
    }

    ucitajPosao(lista) {
        fetch("https://localhost:5001/Posao/PreuzmiPosaoOdSale/" + this.id, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(posao => {
                    lista.naruceneUsluge = [];
                    let ukupno = 0;
                     console.log(posao.usluga);
                    posao.usluga.forEach(usluga => {
                        usluga.brojIzabranih = 1;
                        lista.dodajUslugaUListu(usluga);
                        lista.prikaziListuNarucenih();
                        ukupno += usluga.cena;
                    });
                    lista.container.querySelector(".ukupno .ukupan_iznos").innerHTML = (ukupno) + ".00";
                    lista.container.querySelector(".uputstvo_labela").innerHTML = "Uputstvo: "
                        + (posao.dodatnoUputstvo != null ? posao.dodatnoUputstvo : "");
                    let veterinarSelect = lista.container.querySelector(".veterinar_nadimak");
                    veterinarSelect.value = posao.veterinar.nadimak;
                    veterinarSelect.disabled = true;

                    this.bolnica.selektovanPosaoID = posao.id;
                    this.bolnica.selektovanaSalaID = this.id;

                })
            }
        })
    }

    promeniStanje() {
        let dugme = this.container.querySelector("button");
        if (this.slobodana) {
            dugme.classList.remove("slobodana_sala");
            dugme.classList.add("zauzeta_sala");
        }
        else {
            dugme.classList.remove("zauzeta_sala");
            dugme.classList.add("slobodana_sala");
        }
        this.slobodana = !this.slobodana;
    }
}