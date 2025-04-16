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
    return { success: true, data: libro, message: "Libro creado" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const obtenerLibros = async () => {
  try {
    const libros = await Libro.find({}, { _id: 0 });
    return { success: true, data: libros, message: "Libros obtenidos" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const obtenerLibroPorId = async (id: string) => {
  try {
    const libro = await Libro.findById(id, { _id: 0 });
    if (libro) {
      return { success: true, data: libro, message: "Libro encontrado" };
    } else {
      return { success: false, message: "Libro no encontrado" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const actualizarLibro = async (
  id: string,
  data: { titulo?: string; autor?: string; anio?: number; genero?: string }
) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(id, data, { new: true });
    if (!libroActualizado) {
      return { success: false, message: "Libro no encontrado para actualizar" };
    } else {
      return { success: true, data: libroActualizado, message: "Libro actualizado" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const eliminarLibro = async (id: string) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(id);
    if (!libroEliminado) {
      return { success: false, message: "Libro no encontrado para eliminar" };
    } else {
      return { success: true, data: libroEliminado, message: "Libro eliminado" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export {
  crearLibro,
  obtenerLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro,
};