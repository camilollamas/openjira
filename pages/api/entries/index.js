import { db, seedData } from '../../../database';
import Entry from '../../../models/Entry';

export default function handler(req, res) {

  switch(req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req, res);
    case 'PUT':
      return postEntry(req, res);
    default:
      return res.status(405).json({message: 'Método HTTP no permitido'});
  }

}

const getEntries = async (res) => {
  await db.connect();
  const entries = await Entry.find().sort({createdAt: 'ascending'}); // Ordena por fecha de creación'};
  await db.disconnect();

  res.status(200).json(entries);
}

const postEntry = async (req, res) => {
  const { description } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: new Date(),
    status:'pending'
  });

  try {
    await db.connect();
    // const entries = await Entry.create(newEntry);
    await newEntry.save();
    await db.disconnect();
    res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error)
    res.status(500).json({message: 'Error al crear la entrada'});
  }
}
