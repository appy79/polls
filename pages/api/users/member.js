import { v4 } from "uuid";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res){
    const {db} = await connectToDatabase();

    const bcrypt = require('bcrypt');
    const saltRounds = 8;

    const { method } = req;
    switch (method) {
        case "POST":
            const hashpass = await bcrypt.hash(req.body.password, saltRounds);
            try {
                const member = {
                    _id: v4(),
                    roll: req.body.roll,
                    email: req.body.email,
                    password: hashpass,
                    name: req.body.name,
                    voted: [],
                    created: []
                }
                const response = await db.collection("members").insertOne(member);
                res.status(201).json({ success: true});
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}