import { connect } from "@/databaseConfig/dbConfig";
import Organization from "@/models/organizationModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try{


        const reqBody = await request.json()
        const {email, password} = reqBody
        //console.log(reqBody)

        //checking if organization exists
        const organization = await Organization.findOne({email})

        if(!organization){
            return NextResponse.json({error: 'Organization does not exist'}, {status: 400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, organization.password)

        if(!validPassword){
            return NextResponse.json({error:'Invalid password'}, {status:400})
        }
        //create token data
        const tokenData ={
            id: organization._id,
            email: organization.email,
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn: '5h'})

        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
            organizationId: organization._id
        })

        response.cookies.set('token', token,{
            httpOnly:true
        })

        return response

    } catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}