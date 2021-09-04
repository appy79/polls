import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectToDatabase} from "../../../lib/mongodb";

const options = {
    providers: [
        Providers.Credentials({
            name: "Poll Sys",
            credentials:{
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                const {db} = await connectToDatabase();
                const user = await db.collection("members").findOne({email:credentials.email, password:credentials.password});
                return user;
            }
        })
    ],
    session:{
        jwt:true,
    }
}

export default (req, res) => NextAuth(req, res, options);