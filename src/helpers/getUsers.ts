
import User from "@/models/userModel";
import {connect} from "@/dbconfig/dbconfig";

connect()

export const getAllUsers = async ({email}: any) => {
     
     try{
        const user = await User.findOne({email});
        return user;
     }catch(error){
        return null;
     }
}