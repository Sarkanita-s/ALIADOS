# 🤝 ALIADOS - Prototipo MVP (Simulador Móvil)

> **Plataforma Colaborativa de Coparentalidad y Bienestar del Menor**  
> *Proyecto desarrollado por Gómez y Schmied SPA para la Corporación de Asistencia Judicial (CAJ) San Miguel.*
---

## 🚀 Comandos para Inicializar y Probar el Proyecto

Puedes levantar y probar el proyecto usando:

### Opción 1: Servidor Local con Python
Si tienes Python instalado en tu equipo, abre una terminal en la carpeta del proyecto y ejecuta:

```bash
python3 -m http.server 8080
```

Luego, abre tu navegador web e ingresa a:
👉 **[http://localhost:8080](http://localhost:8080)**

---

### Opción 2: Apertura Directa (Sin Terminal ni Servidor)
No es estrictamente obligatorio usar un servidor:
1. Abre tu explorador de archivos.
2. Navega hasta la carpeta del proyecto.
3. Haz doble clic en el archivo **`index.html`** (o clic derecho > *Abrir con* > Tu navegador favorito).

---

### Opción 3: Visual Studio Code / IDE
Si utilizas VS Code:
1. Instala la extensión **Live Server** (`ritwickdey.LiveServer`).
2. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.

---

## 📁 Estructura del Proyecto

```text
ALIADOS/
├── README.md               # Instrucciones de inicio, comandos y guía de prueba (este archivo)
├── index.html              # Estructura principal del simulador y de las 5 vistas
├── css/
│   ├── themes.css          # Design Tokens (variables de colores y temas dinámicos)
│   ├── phone-frame.css     # Simulación de la carcasa móvil, status bar y paneles
│   ├── app.css             # Estilos de la app móvil, componentes y vistas
│   └── animations.css      # Animaciones de transición, pulso SOS y toques
├── js/
│   ├── data.js             # Datos iniciales realistas (menores, roles, eventos, wishlist)
│   └── app.js              # Controlador interactivo, navegación, estado y modales
├── 1.Acta de Constitución del Proyecto ALIADOS.docx  # Documento base de gestión
└── Aliados.docx                                      # Antecedentes de investigación y roles
```