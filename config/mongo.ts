import mongoose from "mongoose";
process.loadEnvFile()

const URI_DB: string = process.env.URI_DB || "mongodb://localhost:27017"

export async function connectDB () {
  try {
    await mongoose.connect(URI_DB)
    console.log("MongoDB conectado con exito!")
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
  }
}