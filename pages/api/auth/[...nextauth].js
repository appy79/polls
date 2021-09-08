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
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            if (user) {
              token.uid = user._id;
              token.roll = user.roll;
              token.voted = user.voted;
              token.created = user.created;
            }
            return Promise.resolve(token);
        },
        session: async (session, user, _sessionToken) => {
            session.user.id = user.uid;
            session.user.roll = user.roll;
            session.user.voted = user.voted;
            session.user.created = user.created;
            return Promise.resolve(session);
        },
    },
}

export default (req, res) => NextAuth(req, res, options);