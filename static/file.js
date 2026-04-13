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

// Colleghiamo la funzione al click del bottone
document.getElementById('btn-ora').addEventListener('click', richiediOraDalServer);
document.getElementById('btn-saluto').addEventListener('click', inviaSaluto);