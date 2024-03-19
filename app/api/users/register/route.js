import { connectMongoDB } from "@/lib/connectMongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req){


    try{
    await connectMongoDB();
    const { username , password , email} = await req.json();
    
    const user = await User.findOne({ email});

    if(user){
        const error = new Error("User already exists");
        error.status = 301;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({ username , email , password : hashedPassword });
    return NextResponse.json({message: "User created successfully" , status:201});

    }catch(e){
        return NextResponse.json({message : "Error register " , error:e.message , status: e.status || 404} );

    }

}