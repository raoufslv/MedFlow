import mongoose from 'mongoose';

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`);
    }catch (err){
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDb;
