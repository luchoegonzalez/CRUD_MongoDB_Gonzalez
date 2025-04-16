# 📄 Gestión de Libros (Mongoose + TypeScript)
## Documentación

Este archivo implementa un modelo Mongoose para representar libros y funciones asincrónicas para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los documentos almacenados en una base de datos MongoDB.

----------

### 🔌 Conexión a la Base de Datos
```
import { connectDB } from  "./config/mongo"; 
connectDB();
```

Se importa y ejecuta la función `connectDB` para establecer conexión con la base de datos MongoDB.

----------

### 🧩 Interface: `LibroInterface`
```
interface  LibroInterface  extends  Document {
	titulo: string; 
	autor: string; 
	anio: number; 
	genero: string;
}
```

Define la estructura de los documentos de tipo **libro** en MongoDB.

----------

### 🧱 Esquema de Mongoose

```
const libroSchema = new  Schema<LibroInterface>({ 
	titulo: { type: String, required: true }, 
	autor: { type: String, required: true }, 
	anio: { type: Number, required: true, min: 1400, max: 2025 }, 
	genero: { type: String, required: true },
}, { timestamps: false, versionKey: false });

libroSchema.set("strict", true);
```

Este esquema define las validaciones y campos permitidos para el modelo `Libro`:

-   `titulo`: obligatorio
    
-   `autor`: obligatorio
    
-   `anio`: obligatorio, entre 1400 y 2025
    
-   `genero`: obligatorio
    

----------

### 📘 Modelo Mongoose

`const  Libro = mongoose.model<LibroInterface>("libro", libroSchema);` 

Crea el modelo `Libro`, el cual interactúa con la colección `libros` en MongoDB.

----------

## ⚙️ Funciones CRUD

### ➕ `crearLibro(data)`

Crea un nuevo libro en la base de datos.

`crearLibro({ titulo: "1984", autor: "George Orwell", anio: 1949, genero: "Distopía" });` 

**Parámetros:**

-   `data`: objeto con los campos del libro
    

**Retorna:**

`{ success: boolean, data?: any, message: string }` 

----------

### 📚 `obtenerLibros()`

Obtiene todos los libros de la base de datos.

`obtenerLibros();` 

**Retorna:**

`{ success: boolean, data?: LibroInterface[], message: string }` 

----------

### 🔍 `obtenerLibroPorId(id)`

Busca un libro por su ID.

`obtenerLibroPorId("60f9a3c...");` 

**Parámetros:**

-   `id`: string del ObjectId de MongoDB
    

**Retorna:**

`{ success: boolean, data?: LibroInterface, message: string }` 

----------

### ✏️ `actualizarLibro(id, data)`

Actualiza los datos de un libro por su ID.

`actualizarLibro("60f9a3c...", { titulo: "Nuevo Título" });` 

**Parámetros:**

-   `id`: string del ID del libro
    
-   `data`: campos a actualizar (parciales)
    

**Retorna:**

`{ success: boolean, data?: LibroInterface, message: string }` 

----------

### ❌ `eliminarLibro(id)`

Elimina un libro por su ID.

`eliminarLibro("60f9a3c...");` 

**Parámetros:**

-   `id`: string del ID del libro
    

**Retorna:**

`{ success: boolean, data?: LibroInterface, message: string }` 

----------

## 🖥️ CLI - Interfaz de Línea de Comandos

Este proyecto incluye un CLI para interactuar fácilmente con el sistema de libros desde la terminal.

### ▶️ Uso general

```bash
node dist/index.js <accion> [parametros]

```

----------

### 📚 Acciones disponibles

#### 🔹 `getLibros`

Obtiene todos los libros.

```bash
node dist/index.js getLibros

```

----------

#### 🔹 `getLibroPorId <id>`

Obtiene un libro por su ID.

```bash
node dist/index.js getLibroPorId 64dabc1234f...

```

----------

#### 🔹 `createLibro <titulo> <autor> <anio> <genero>`

Crea un nuevo libro.

```bash
node dist/index.js createLibro "Cien años de soledad" "Gabriel García Márquez" 1967 "Realismo mágico"

```

----------

#### 🔹 `updateLibro <id> campo1=valor1 campo2=valor2 ...`

Actualiza un libro existente.

```bash
node dist/index.js updateLibro 64dabc1234f... titulo="Nuevo Título" anio=2000

```

----------

#### 🔹 `deleteLibro <id>`

Elimina un libro por ID.

```bash
node dist/index.js deleteLibro 64dabc1234f...

```

----------

### 📤 Respuesta estándar

Todas las acciones devuelven un objeto con el siguiente formato:

```json
{
  "success": true | false,
  "data": <resultado_opcional>,
  "message": "Mensaje descriptivo"
}

```