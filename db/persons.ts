import mongoose from 'mongoose';
import { Person} from "../types.ts";


const Schema= mongoose.Schema

const schemaPerson= new Schema({
    nombre:{type:String,required:true},
    phone:{type:String,required:true},
    country:{type:String,required:true}
},
{timestamps:true})

export type tipoperson= mongoose.Document & Omit<Person,"id">

export const ModeloPerson= mongoose.model<tipoperson>("Personas",schemaPerson)