import mongoose, { Schema } from "mongoose";
import {  IUser } from "../interfaces/IUser";

const UserSchema=new Schema<IUser>({
    name:{
        type:String,
        required:[true,"name is required"],
    },
    uniqueSchId:{
        type:Number,
        required:[true,"Unique Id is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    state:{
        type:String,
        required:[true,"state is required"],
    },
    city:{
        type:String,
        required:[true,"city is required"],
    },
    address:[
        {
            street:{
                type:String,
                required:[true,"street is required"],
            },
            zipcode:{
                type:String,
                required:[true,"zipcode is required"],
            }
        }
    ],
    filePath:{
        type:String,
        required:[true,"file path is required"],
    },
    role:{
        type:String,
        required:[true,"role is required"],
        enum:['admin','student','teacher']
    }
},{timestamps:true})

const User=mongoose.model("user",UserSchema)
export default User