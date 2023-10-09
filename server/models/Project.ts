import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    name: {type: String},
    description: {type: String},
    status: {
        type: String,
        enum: ['Not Started','In Progress', 'Completed']
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
})

const projectModel = model('Project', projectSchema);

export default projectModel;