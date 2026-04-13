// Funzione che interroga il server
async function richiediOraDalServer() {
    try {
        const risposta = await fetch('/ora');
        const dati = await risposta.json();
        
        const elementoOrario = document.getElementById('orario');
        elementoOrario.innerText = "Il server dice che sono le: " + dati.orario;
        
        // Un tocco di classe: cambiamo colore al testo per mostrare l'aggiornamento
        elementoOrario.style.color = "#ad4949"; 
    } catch (errore) {
        console.error("Errore di connessione:", errore);
    }
}
async function inviaSaluto() {
    // 1. Prendiamo quello che l'utente ha scritto
    const nomeUmano = document.getElementById('input-nome').value;

    if (nomeUmano === "") {
        alert("Ehi, inserisci un nome!");
        return;
    }

    // 2. Chiamiamo il server passando il nome nell'URL (?nome=...)
    const res = await fetch(`/saluta?nome=${nomeUmano}`);
    const json = await res.json();

    // 3. Mostriamo la risposta del server nella pagina
    document.getElementById('risposta-saluto').innerText = json.messaggio;
}
async function sommaDiDueNumeri() {
    // 1. Prendiamo i valori dagli input
    const numero1 = document.getElementById('num1').value;
    const numero2 = document.getElementById('num2').value;

    if (numero1 === "" || numero2 === "") {
        alert("Inserisci entrambi i numeri!");
        return;
    }

    // 2. Chiamiamo il server passando i numeri
    const res = await fetch(`/somma?a=${numero1}&b=${numero2}`);
    const json = await res.json();

    // 3. Mostriamo il risultato
    document.getElementById('risultato-somma').innerText = 
        "Risultato: " + json.risultato;
}
async function calcola() {
    const n1 = document.getElementById('num1-calc').value;
    const n2 = document.getElementById('num2-calc').value;
    const op = document.getElementById('operazione').value;

    if (n1 === "" || n2 === "") {
        alert("Inserisci entrambi i numeri!");
        return;
    }

    const res = await fetch(`/calcolatrice?a=${n1}&b=${n2}&op=${op}`);
    const json = await res.json();

    document.getElementById('risultato').innerText =
        "Risultato: " + json.risultato;
}

// Colleghiamo la funzione al click del bottone
document.getElementById('btn-ora').addEventListener('click', richiediOraDalServer);
document.getElementById('btn-saluto').addEventListener('click', inviaSaluto);
document.getElementById('btn-somma').addEventListener('click', sommaDiDueNumeri);
document.getElementById('btn-calcola').addEventListener('click', calcola)