import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import { connect } from "@/databaseConfig/dbConfig";

connect()

export async function GET(request: NextRequest){
    try{
        const userID = await getDataFromToken(request)
        console.log('UserID from token:', userID);
        const user = await Organization.findOne({_id:userID}).select('-password ');
        return NextResponse.json({
            message: 'Organization Found',
            data:user
        })
    }catch(error:any){
        return NextResponse.json({error:error.message}, {status:400})
    }
}