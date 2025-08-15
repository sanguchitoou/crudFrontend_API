# CRUD Frontend (Base) – HTML + CSS

Frontend mínimo y **listo para agregar JavaScript** (vanilla JS con módulos) para consumir una **API REST en Spring Boot**.  
Se pensó como **proyecto base** para cursos y demostraciones de CRUD: crear, listar, actualizar y eliminar.

## ✅ Qué incluye
- **HTML + CSS** limpios y listos para usar.
- Estructura básica de páginas: `index.html` (inicio) y `categories.html` (módulo de categorías).
- Preparado para **agregar tu propio JS** (controllers/services).
- Ideal para abrirse con **XAMPP (Apache)** sin configuraciones complejas.

## 📁 Estructura
```
crudFrontend/
├─ css/
│  └─ style.css
├─ index.html
└─ categories.html
```

> Puedes añadir luego una carpeta `js/` con tus módulos ES (services/controllers).

---

## 🖥️ Cómo ejecutarlo con XAMPP (Apache)

1. **Clona o descarga** este repositorio.
2. Copia la carpeta del proyecto dentro de:
   - Windows: `C:\xampp\htdocs\crudFrontend`
3. Abre **XAMPP Control Panel** y **enciende Apache**.
4. En tu navegador visita:  
   **http://localhost/crudFrontend/**  
   (La página de categorías suele estar en **http://localhost/crudFrontend/categories.html**)

> Si cambias el nombre de la carpeta, ajusta la URL en el navegador.

---

## 🔌 Conexión con la API (Spring Boot)

Este frontend está pensado para consumir una **API REST en Spring Boot** (por ejemplo, corriendo en `http://localhost:8080/api`).


## 🧩 Agregar el JavaScript (sugerido)

Crea esta estructura:

```
js/
├─ services/
│  └─ categoryService.js   // llamadas fetch a la API
   └─ productService.js   // llamadas fetch a la API
└─ controllers/
   └─ categoryController.js // maneja la UI y usa los services
   └─ productController.js   // maneja la UI y usa los services
```


```

> Este repo ya está **listo para que agregues el JS**: solo crea la carpeta `js/`, pega los archivos y referencia tu `<script type="module">` en el HTML.

---

## 🛡️ CORS (nota rápida)
Si sirves el frontend en **Apache (puerto 80)** y la API en **Spring Boot (puerto 8080)**, tu backend debe permitir CORS.  
En Spring Boot, expón CORS en tu configuración (por controlador o globalmente). Esto podemos hacerlo con @CrossOrigin.

---

## 🧪 Comprobación rápida
1. Inicia la API de Spring Boot (ej. `http://localhost:8080/api`).
2. Inicia Apache en XAMPP.
3. Abre `http://localhost/crudFrontend/`.
4. Revisa la consola del navegador para ver las respuestas de `fetch()` mientras integras la UI.

---

## 📜 Este proyecto base puede usarse libremente para fines educativos y demostrativos.

---

## ✍️ Ricardo De Paz
Proyecto base de frontend para CRUD que consume **API en Spring Boot**, preparado para ejecutarse con **XAMPP (Apache)** y **listo para agregar JavaScript**.
