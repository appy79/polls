const mail = require('@sendgrid/mail');
import { connectToDatabase } from "../../../lib/mongodb";

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function Verify(req, res) {
    const {db} = await connectToDatabase();
    const body = req.body;
    const member = await db.collection("members").findOne({ email: body.email });
    if(member){
        res.status(400).json({success:false}) 
    }
    else{
        const code = Math.floor(100000 + Math.random() * 900000);
        const message = `
            Hey there,\r\n 
            You recently requested to register at NITT PollSys.\r\n 
            Here is your secret code for verification:\r\n
                ${code} \r\n
            If you did not request this please ignore or report at 205120010@nitt.edu.   
            `;

        const data = {
            to: body.email,
            from: 'pollsys@vmothra.fun',
            subject: 'PollSys Verification',
            text: message,
            html: message.replace(/\r\n/g, '<br>')
        };

        try {
            mail.send(data);
            res.status(200).json({ status: 'Ok', success: true, "code":code })
        } catch (error) {
            res.status(400).json({success:false});
        }
    }
}