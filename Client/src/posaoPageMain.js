import { ListaUsluga } from "./ListaUsluga.js";
import { PosaoForma } from "./PosaoForma.js";

let card = document.querySelector(".card");
let posaoForma = new PosaoForma();
posaoForma.crtajFormuZaPosao(card);