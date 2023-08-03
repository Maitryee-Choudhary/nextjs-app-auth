import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { send } from "process";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email} = reqBody;

        console.log(reqBody);

       const user = await User.findOne({email});
       if(!user){
        return NextResponse.json({error:"User doesn exist with email"}, {status: 500});
       }
       await sendEmail({email, emailType:"RESET", userId: user._id});

       return NextResponse.json({
        message:"Please check your email",
        success: true
       },{status: 200});

    }catch(error){
        return NextResponse.json({error:error}, {status:500});
    }
    
}