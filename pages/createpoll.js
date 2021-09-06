import PollForm from "../components/polls/PollForm";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useState, useEffect } from "react";

function createpoll() {

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const securePage = async()=>{
            const session = await getSession();
            if(!session) {
                signIn();
            }
            else {
                setLoading(false);
            }
        }
        securePage();
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }
    

    const onCreate = async (newPoll) => {
        const response = await fetch("/api/polls", {
        method: "POST",
        body: JSON.stringify(newPoll),
        headers: {
            "Content-Type": "application/json",
        },
        });
        const res = await response.json();
        if(res.success){
            alert("Poll Created")
        }
        else{
            console.log(res);
        }
    }

    return (
        <div className="">
            <PollForm onCreate={onCreate} />
        </div>
    );
}

export default createpoll;