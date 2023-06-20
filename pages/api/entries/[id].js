import mongoose from 'mongoose'
import { db } from '../../../database';
import { Entry } from '../../../models';

export default function handler(req, res) {

  const { id } = req.query;

  if(!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'El id no es válido' })
  }

  switch(req.method) {
    case 'PUT':
      return updateEntry(req, res, id);
    case 'GET':
      return getEntry(req, res, id);
    case 'DELETE':
      return deleteEntry(req, res, id);
      default:
        return res.status(405).json({message: 'Método HTTP no permitido'});
  }   
}

const updateEntry = async (req, res, id) => {
  
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    
    if(!entry) {
      await db.disconnect();
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    const { 
      status = entry.status, 
      description = entry.description 
    } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
    res.status(200).json(updatedEntry);

    await db.disconnect();

    res.status(200).json(entry);
  } catch (error) {
    await db.disconnect();
    console.log(error)
    res.status(500).json({message: 'Error al actualizar la entrada'});
  }
}

const getEntry = async (req, res, id) => {
  
    try {
      await db.connect();
      const entry = await Entry.findById(id);
      await db.disconnect();
  
      if(!entry) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
  
      res.status(200).json(entry);
    } catch (error) {
      await db.disconnect();
      res.status(500).json({message: 'Error al obtener la registro'});
    }
}
const deleteEntry = async (req, res, id) => {
    
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    
    if(!entry) {
      await db.disconnect();
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    await Entry.findByIdAndDelete(id);
    await db.disconnect();

    res.status(200).json({message: 'Registro eliminado'});
  } catch (error) {
    await db.disconnect();
    res.status(500).json({message: 'Error al eliminar la registro'});
  }
}