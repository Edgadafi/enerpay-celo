# Crear repositorio LANA Celo en GitHub

## 1. Crear el repositorio en GitHub

Abre este enlace (crea un repo nuevo con nombre **LANA-Celo** y descripción rellenada):

**https://github.com/new?name=LANA-Celo&description=Cobros+e+inclusi%C3%B3n+financiera+para+mujeres+emprendedoras+en+LATAM.+Potenciado+por+Celo**

- **Repository name:** LANA-Celo (o el que prefieras)
- **Description:** Cobros e inclusión financiera para mujeres emprendedoras en LATAM. Potenciado por Celo
- **Public**
- **No** marques "Add a README" (el código ya está en tu máquina)

Pulsa **Create repository**.

## 2. Añadir remoto y hacer push

En la terminal, desde la carpeta del proyecto:

```bash
cd /home/edgadafi/enerpay
git remote add lana-celo https://github.com/Edgadafi/LANA-Celo.git
git push -u lana-celo main
```

Si tu usuario de GitHub no es `Edgadafi`, cambia la URL por `https://github.com/TU_USUARIO/LANA-Celo.git`.

Si ya añadiste el remoto antes, solo ejecuta:

```bash
git push -u lana-celo main
```
