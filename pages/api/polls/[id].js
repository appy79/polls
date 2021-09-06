import { connectToDatabase } from "../../../lib/mongodb";
import { getSession } from "next-auth/client";


export default async (req, res) => {

  const session = await getSession({req});

  const {db} = await connectToDatabase();

  const { query: { id }, method } = req;

  switch (method) {
    case "GET":
      try {
        const poll = await db.collection("polls").findOne({ _id: id });
        if (!poll) {
          return res.status(400).json({ success: false, data: "poll not found" });
        }

        res.status(200).json({ success: true, data: poll});
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      if (!session){
        res.status(403).json({error: "You need to sign in." })
      }
      else{
        try {
          const poll = await db.collection("polls").findOne({ _id: id });
          if (!poll) {
            return res.status(400).json({ success: false, data: "poll not found" });
          }
  
          const updatedPoll = await db.collection("polls").updateOne( {
              _id: id, 
              'choices._id':req.body.choice 
          }, { 
              $inc:{
                 'choices.$.count': 1,
                 'total': 1 
              }});
          res.status(200).json({ success: true, data: updatedPoll });
        } catch (error) {
          res.status(400).json({ success: false});
        }
      }
      break;
    case "DELETE":
      if (!session){
        res.status(403).json({error: "You need to sign in." })
      }
      else {
        try { 
          const poll = await db.collection("polls").findOne({ _id: id });
          if (!poll) {
            return res.status(400).json({ success: false, data: "poll not found" });
          }
          const deletePoll = await db.collection("polls").deleteOne({ _id: id });
          res.status(200).json({ success: true, data: poll });
        } catch (error) {
          res.status(400).json({ success: false });
          console.log(error)
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};