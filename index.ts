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