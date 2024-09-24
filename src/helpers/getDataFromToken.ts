import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) =>{
    try{
        // Retrieve the token from cookies
        const token = request.cookies.get('token')?.value || ''

        // Verify and decode the token using the secret key
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)

        // Return the user ID or any other relevant info from the decoded token
        return decodedToken.id
    }
    catch(error:any){

        console.error('Error verifying token:', error.message);


        // If token is expired, throw a specific error
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else {
            throw new Error('Invalid token');
        }
        //throw new Error(error.message);
        
    }
}