from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Spieghiamo a FastAPI che i file dentro "static" sono accessibili
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/") # endpoint, punto in cui chiamiamo il server web che restituisce la home page
def home():
    # Restituisce direttamente il file HTML
    return FileResponse('static/home.html')

from datetime import datetime

@app.get("/ora")
def dammi_ora():
    # Restituiamo un dizionario (JSON)
    return {"orario": datetime.now().strftime("%H:%M:%S")}

# NUOVO: Endpoint con parametro di query
@app.get("/saluta")
def saluta_utente(nome: str):
    return {"messaggio": f"Ciao {nome}, benvenuto nel server di Terza!"}

@app.get("/somma")
def somma(a: float, b: float):
    risultato = a + b
    return {"risultato": risultato}

@app.get("/calcolatrice")
def calcolatrice(a: float, b: float, op: str):
    print(op)
    if op == "più":
        risultato = a + b
    elif op == "-":
        risultato = a - b
    elif op == "*":
        risultato = a * b
    elif op == "/":
        if b == 0:
            return {"risultato": "Errore: divisione per zero"}
        risultato = a / b
    else:
        return {"risultato": "Operazione non valida"}

    return {"risultato": risultato}
