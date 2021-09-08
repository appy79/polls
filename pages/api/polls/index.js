import { connectToDatabase } from "../../../lib/mongodb";
const {v4} = require('uuid')
import { getSession } from "next-auth/client";


export default async function handler(req, res){

    const session = await getSession({req});

    const {db} = await connectToDatabase();

    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const polls = await db.collection("polls").find({}).toArray();
                
                res.status(200).json({ success: true, data: polls });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            if (!session){
                res.status(403).json({error: "You need to sign in." })
            }
            else{
                const poll = {
                    _id: v4(),
                    title: req.body.title,
                    creator: req.body.creator,
                    total: 0,
                    voted: [],
                    choices: req.body.choices.map(choice => ({
                        _id: v4(),
                        name: choice,
                        count: 0
                    }))
                }
                try {
                    const crpoll = await db.collection("polls").insertOne(poll);
                    const addToUser = await db.collection("members").updateOne({
                        _id: session.user.id,
                    }, {
                        $push: { created: poll._id }
                    });
                    res.status(201).json({ success: true});
                } catch (error) {
                    res.status(400).json({ success: false });
                }
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}