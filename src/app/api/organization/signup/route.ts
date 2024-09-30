import { connect } from "@/databaseConfig/dbConfig";
import Organization from "@/models/organizationModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){

    try{

       const reqBody= await request.json()
       const {name,email, password, organizationType,contact} = reqBody

       console.log(reqBody)

       //IF Organization exists
       const user =await Organization.findOne({email})
       if(user){
        return NextResponse.json({error:'Organization already exists'}, {status:400})
       }


       //hash password
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)

       const newOrganization = new Organization({
        name,
        email,
        organizationType,
        password: hashedPassword,
        contact
       })


       const savedOrganization= await newOrganization.save()
       console.log(savedOrganization)

       return NextResponse.json({
        mesage: 'Organization created successfully',
        success: true,
        savedOrganization
       })


       
    }
    catch(error:any){
        console.error('Error during organization signup:', error);
        return NextResponse.json({error: error.message},
            {status:500}
        )
    }
}