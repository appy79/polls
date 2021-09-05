import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res){
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
            try {
                const inserted = await db.collection("polls").insertOne(req.body);
                let id = inserted.insertedId
                const poll = await db.collection("polls").findOne({ _id: id });
                res.status(201).json({ success: true, data: poll});
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}