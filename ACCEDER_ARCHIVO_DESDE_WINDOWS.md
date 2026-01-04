# 🌐 Acceder al Archivo JSON desde Windows

## ⚠️ Problema
Los archivos están en WSL (Linux) y necesitas acceder desde Windows Explorer.

---

## 📋 Soluciones

### Opción 1: Ruta de Red de Windows (Recomendado)

1. **Abre el Explorador de Windows**

2. **En la barra de direcciones, escribe:**
   ```
   \\wsl.localhost\Ubuntu\home\edgadafi\enerpay\contracts\artifacts\build-info
   ```
   
   O si tu distro tiene otro nombre:
   ```
   \\wsl.localhost\[nombre-distro]\home\edgadafi\enerpay\contracts\artifacts\build-info
   ```

3. **Busca el archivo:**
   ```
   dfd1dbca2d35391bf80368e6065e8b69.json
   ```

**Nota:** Si `\\wsl.localhost` no funciona, prueba:
```
\\wsl$\Ubuntu\home\edgadafi\enerpay\contracts\artifacts\build-info
```

---

### Opción 2: Copiar Archivo a Windows

#### Desde WSL Terminal:

```bash
# Copiar a Escritorio (reemplaza [tu-usuario] con tu nombre de usuario de Windows)
cp /home/edgadafi/enerpay/contracts/artifacts/build-info/dfd1dbca2d35391bf80368e6065e8b69.json /mnt/c/Users/[tu-usuario]/Desktop/enerpay-verification.json
```

#### O copiar a una carpeta pública:

```bash
cp /home/edgadafi/enerpay/contracts/artifacts/build-info/dfd1dbca2d35391bf80368e6065e8b69.json /mnt/c/Users/Public/Desktop/enerpay-verification.json
```

Luego busca el archivo en:
- `C:\Users\Public\Desktop\enerpay-verification.json`
- O en tu Escritorio

---

### Opción 3: Usar VS Code o Editor con WSL

Si tienes VS Code abierto:

1. Abre la carpeta: `enerpay/contracts/artifacts/build-info/`
2. Haz clic derecho en `dfd1dbca2d35391bf80368e6065e8b69.json`
3. Selecciona "Reveal in File Explorer" (si está disponible)
4. O "Copy Path" y luego pega en Celoscan

---

### Opción 4: Arrastrar y Soltar desde VS Code

1. Abre VS Code en la carpeta del proyecto
2. Navega a: `contracts/artifacts/build-info/`
3. Arrastra el archivo `dfd1dbca2d35391bf80368e6065e8b69.json` directamente a la ventana de Celoscan donde dice "Choose File"

---

## 🔍 Encontrar el Nombre de tu Distro WSL

Para saber el nombre exacto de tu distro:

```bash
# En WSL terminal
cat /etc/os-release | grep "^ID="
```

O simplemente prueba:
- `Ubuntu`
- `Debian`
- `kali-linux`
- O el nombre que veas en la terminal de WSL

---

## ✅ Verificación Rápida

Una vez que encuentres el archivo, verifica que es el correcto:
- **Nombre:** `dfd1dbca2d35391bf80368e6065e8b69.json`
- **Tamaño:** ~1.7 MB
- **Ubicación:** `artifacts/build-info/`

---

## 💡 Recomendación

**La forma más fácil es usar la ruta de red:**
```
\\wsl.localhost\Ubuntu\home\edgadafi\enerpay\contracts\artifacts\build-info
```

O copiar el archivo a tu Escritorio de Windows para acceso rápido.

---

**¡Prueba estas opciones y dime cuál funciona!** 🚀

