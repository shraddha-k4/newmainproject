import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobileno:{
        type:Number,
        unique:true,
        required:true,
    },
    role: {
    type: String,
    enum: [ "customer", "seller"],
    default: "customer",
  },
},{timestamps:true})

export const User=mongoose.model('User',userSchema);