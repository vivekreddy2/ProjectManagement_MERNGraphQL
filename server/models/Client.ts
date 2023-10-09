import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
})

const clientModel = model('Client', clientSchema);

export default clientModel;