import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';
//import  jwt  from "jsonwebtoken";


export const getDataFromToken = async (request: NextRequest) =>{
    try{
        // Retrieve the token from cookies
        const token = request.cookies.get('token')?.value || ''
        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

        const { payload } = await jwtVerify(token, secret);
        return payload.id;

        // Verify and decode the token using the secret key
        //const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)

        // Return the user ID or any other relevant info from the decoded token
        //return decodedToken.id

    }
    catch(error:any){

        console.error('Error verifying token:', error.message);

        // If token is expired or invalid, throw specific errors
        if (error.code === 'ERR_JWT_EXPIRED') {
            throw new Error('Token has expired');
        } else {
            throw new Error('Invalid token');
        }

        // If token is expired, throw a specific error
        /*if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else {
            throw new Error('Invalid token');
        }*/
        //throw new Error(error.message);
        
    }
}

// Server-side logic to clear the token cookie
