import { isValidObjectId } from "mongoose"
import Entry from '../models/Entry';
import { db } from './';


export const getEntriById = async (id) => {

  if(!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const data = await Entry.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(data))
}