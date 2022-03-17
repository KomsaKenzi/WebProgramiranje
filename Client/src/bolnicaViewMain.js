import { Bolnica } from "./Bolnica.js";

let listaBolnica = [];

fetch("https://localhost:5001/Bolnica/PreuzmiBolnice", {
    method: "GET"
}).then(s => {
    if (s.ok) {
        s.json().then(data => {
            data.reverse().forEach(bolnica => {
                let novaBolnica = new Bolnica(bolnica.id, bolnica.naziv, bolnica.adresa, bolnica.dimenzijaX, bolnica.dimenzijaY);
                listaBolnica.push(novaBolnica);
                novaBolnica.crtajBolnicu(document.body);
            });
        })
    }

})
