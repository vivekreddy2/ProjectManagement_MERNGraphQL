import {connect} from 'mongoose';


export const connectDB = async () => {
    const dBonnection = await connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${dBonnection.connection.host}`.green.underline.bold)

}