import mongoose from "mongoose";

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  
  if (mongoConnection.isConnected) {
    console.log('Ya estabamos Conectados a la base de datos')
    return;
  }

  if(mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if(mongoConnection.isConnected === 1) {
      console.log('Usando la misma conexion')
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL_DEV || '')
  mongoConnection.isConnected = 1;

  console.log('Conecatado a MongoDB', process.env.MONGO_URL_DEV)
}

export const disconnect = async () => {

  if(process.env.NODE_ENV === 'development') return console.log('No se cierra la conexion en desarrollo');

  if(mongoConnection.isConnected === 0) return

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Desconectado de MongoDB')
  
}