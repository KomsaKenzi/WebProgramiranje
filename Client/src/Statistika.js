import { Grafik } from "./Grafik.js";

export class Statistika {
    constructor() {
        this.container = null;
        this.grafik = null;
        this.podaci = null;

    }

    crtajStatistiku(host) {
        this.container = host;

        let kartica = document.createElement("div");
        kartica.classList.add("card");
        kartica.classList.add("card_statistika");
        this.container.appendChild(kartica);

        let okvirKontrola = document.createElement("div");
        okvirKontrola.className = "okvir_statistike";
        kartica.appendChild(okvirKontrola);

        let okvirBolniceSelect = document.createElement("div");
        okvirBolniceSelect.classList.add("okvir_kategorije");
        okvirBolniceSelect.classList.add("okvir_bolnice");
        okvirBolniceSelect.innerHTML = "Bolnica:";
        okvirKontrola.appendChild(okvirBolniceSelect);

        let bolnicaSelect = document.createElement("select");
        bolnicaSelect.classList.add("input_box");
        bolnicaSelect.classList.add("bolnica");
        bolnicaSelect.onchange = () => {
            this.grafik.isprazniGrafik();
            this.container.querySelector("input[type=date]").value = null;
            this.podaci = null;
        }
        okvirBolniceSelect.appendChild(bolnicaSelect);

        let okvirDugmica = document.createElement("div");
        okvirDugmica.className = "statistika_header";
        okvirKontrola.appendChild(okvirDugmica);

        let okvirCheck = document.createElement("div");
        okvirCheck.className = "okvir_radio";
        okvirDugmica.appendChild(okvirCheck);

        let prikazi = ["Dnevnica", "Zarada", "Usluzeni"];
        prikazi.forEach(prikaz => {
            let spanZaPrikaz = document.createElement("span");
            okvirCheck.appendChild(spanZaPrikaz);

            let prikazCheck = document.createElement("input");
            prikazCheck.type = "checkbox";
            prikazCheck.name = "statistika";
            prikazCheck.value = prikaz;
            prikazCheck.onclick = () => {
                if (this.grafik.podaci != null) {
                    this.grafik.isprazniGrafik();
                    this.grafik.crtajStubice();
                }

            }
            spanZaPrikaz.appendChild(prikazCheck);

            let labela = document.createElement("label");
            labela.innerHTML = prikaz;
            spanZaPrikaz.appendChild(labela);
        });

        let okvirDatuma = document.createElement("div");
        okvirDatuma.className = "okvir_datuma";
        okvirDatuma.innerHTML = "Datum:";
        okvirDugmica.appendChild(okvirDatuma);

        let datumInput = document.createElement("input");
        datumInput.type = "date";
        datumInput.className = "input_box";
        datumInput.addEventListener("change", () => {
            this.grafik.crtajGrafik();
        })
        okvirDatuma.appendChild(datumInput);

        let poljeGrafika = document.createElement("div");
        poljeGrafika.className = "grafik_statistika";
        kartica.appendChild(poljeGrafika);

        this.grafik = new Grafik(document.body, poljeGrafika);

        this.ucitajBolnice(bolnicaSelect);
    }

    ucitajBolnice(bolnicaSelect) {
        fetch("https://localhost:5001/Bolnica/PreuzmiBolnice", {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    data.forEach(bolnica => {
                        let bolnicaOption = document.createElement("option");
                        bolnicaOption.innerHTML = bolnica.naziv;
                        bolnicaOption.value = bolnica.id;
                        bolnicaSelect.appendChild(bolnicaOption);
                    });
                });
            }
            else {
                alert("Doslo je do greske prilikom ucitavanja bolnice!");
            }
        });
    }


}