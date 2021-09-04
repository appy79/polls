import React from "react";
import EmailForm from "../components/user/EmailForm";
import InfoForm from "../components/user/Info";
import VerificationForm from "../components/user/VerificationForm";
import { useState } from "react";

function register() {

    const [sent, setSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const sendmail = async (roll) =>{
        const email = `${roll}@nitt.edu`;
        var data = {
            "email":email
        }
        const response = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        console.log(res.code);
    }

    const verify = async (code) =>{

    }

    const adduser = async (nam) =>{

    }



    return (
        <div>
            <EmailForm onChange={sendmail} />
            { sent && <VerificationForm onChange = {verify} /> }
            { verified && <InfoForm onChange = {adduser} /> }
        </div>
    );
}

export default register;