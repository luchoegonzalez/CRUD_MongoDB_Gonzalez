import mongoose, {Document, Schema} from "mongoose";
import { connectDB } from "./config/mongo";

connectDB() 

interface LibroInterface extends Document {
  titulo: string
  autor: string
  anio: number
  genero: string
}

const libroSchema: Schema = new Schema<LibroInterface>({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio: { type: Number, required: true, min: 1400, max: 2025 },
  genero: { type: String, required: true }
}, {timestamps: false, versionKey: false})

libroSchema.set("strict", true)

const Libro = mongoose.model<LibroInterface>("libro", libroSchema)

const crearLibro = async (data: { titulo: string; autor: string; anio: number; genero: string }) => {
  try{
    const libro: LibroInterface = new Libro(data);
    await libro.save();
    console.log("📘 Libro creado:", libro);
  } catch (error) {
    console.error("Error al crear el libro:", error);
  }
};

const obtenerLibros = async () => {
  try {
    const libros = await Libro.find({}, {_id: 0});
    console.log("📚 Libros encontrados:", libros);
  }
  catch (error) {
    console.error("Error al obtener los libros:", error);
  }
};

const obtenerLibroPorId = async (id: string) => {
  try {
    const libro = await Libro.findById(id, {_id: 0});
    if (libro) {
      console.log("📖 Libro encontrado:", libro);
    } else {
      console.log("Libro no encontrado");
    }
  }
  catch (error) {
    console.error("Error al obtener el libro:", error);
  }
};


//--- Testeo de funciones --- Descomentar para probar ---//

//obtenerLibros()

//obtenerLibroPorId("67ff2352c44a5ebec7d2e43a")

// crearLibro({
//   titulo: "Crónica de una muerte anunciada",
//   autor: "Gabriel García Márquez",
//   anio: 1981,
//   genero: "Novela corta"
// })