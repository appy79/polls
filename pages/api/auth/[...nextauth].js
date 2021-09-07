import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectToDatabase} from "../../../lib/mongodb";

const options = {
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                const bcrypt = require('bcrypt');
                const {db} = await connectToDatabase();
                const user = await db.collection("members").findOne({email:credentials.email});
                const compare = await bcrypt.compare(credentials.password, user.password);
                if(compare){
                    return user;
                }
                else{
                    return null;
                }
            }
        })
    ],
    pages:{
        signIn:"/auth/signin"
    },
    session:{
        jwt:true,
    },
    
}

export default (req, res) => NextAuth(req, res, options);