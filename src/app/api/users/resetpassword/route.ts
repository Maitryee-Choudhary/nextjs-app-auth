import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {token,password, cpassword} = reqBody;
        console.log(token, password, cpassword);
        
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry:{$gt: Date.now()}});
        console.log(user);
        if(!user){
            return NextResponse.json({error:"Invalid token"}, {status: 500});
        }

        if(password != cpassword){
           return NextResponse.json({error:"Password do not match"}, {status: 500});
        }

        //salt
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user.password = hashPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;


        await user.save();

        return NextResponse.json({
            message : "Password updated successful",
            success: true
        })


    }catch(error){
        return NextResponse.json({error: "Couldn't set password"}, {status: 500});
    }
}
