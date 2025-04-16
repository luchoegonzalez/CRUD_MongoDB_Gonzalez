import {
  crearLibro,
  obtenerLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro,
} from "./logicaLibros";

const main = async () => {
  const args = process.argv.slice(2);
  const action = args[0];
  let response;

  switch (action) {
    case "obtenerLibros":
      response = await obtenerLibros();
      break;

    case "obtenerLibroPorId":
      response = await obtenerLibroPorId(args[1]);
      break;

    case "crearLibro":
      const nuevoLibro = {
        titulo: args[1],
        autor: args[2],
        anio: parseInt(args[3]),
        genero: args[4],
      };
      response = await crearLibro(nuevoLibro);
      break;

    case "actualizarLibro":
      const id = args[1];
      const updates = args.slice(2);
      const updatesValues: any = {};

      updates.forEach((update) => {
        const [key, value] = update.split("=");
        if (key && value) {
          updatesValues[key] = key === "anio" ? parseInt(value) : value;
        }
      });

      response = await actualizarLibro(id, updatesValues);
      break;

    case "eliminarLibro":
      response = await eliminarLibro(args[1]);
      break;

    default:
      response = { success: false, message: "⚠️ Acción no válida." };
      break;
  };
  console.log(response)
}

main();
