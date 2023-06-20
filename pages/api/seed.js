import { db, seedData } from '../../database';
import Entry from '../../models/Entry';


export default async function handler(req, res) {

  if(process.env.NODE_ENV == 'production') {
    return res.status(401).json({message: 'No tiene acceso a este servicio'});
  }

  await db.connect(); // Abre la conexión
  await Entry.deleteMany(); // Elimina todos los registros
  await Entry.insertMany( seedData.entries ) // Inserta los registros de seedData
  await db.disconnect(); // Cierra la conexión

  res.status(200).json({ name: 'Procesado correctamente' })
}