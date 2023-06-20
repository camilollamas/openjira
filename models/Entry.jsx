import mongoose, { Model, Schema } from 'mongoose'

const EntrySchema = new Schema({
  description: {type: String, required: true},
  createdAt: {type: Number },
  status: {
    type: String, 
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '======>>>> {VALUE} no es un estado valido para la tarea'
    }
  }
});

const EntryModel = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);



export default EntryModel;