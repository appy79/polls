import React, {useState} from "react";
import { session, useSession } from "next-auth/client";
import Bar from "./Bar"

function Poll({poll}) {
    const [active, setActive] = useState(false)
    const [session, loading] = useSession()

    return (
        <div className="mx-auto">
            <div className="flex">
                <p className="flex-grow text-2xl ml-4">{poll.title}</p>
                <button onClick={ () => { setActive(!active) }} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded">{active ? "Hide" : "Show"} Results</button>
            </div>
            { poll.choices.map((choice) => {
                
                return(
                    <div key={choice._id} className="m-4">
                        <div className="flex items-center">
                            <div className="flex flex-col flex-grow">
                                <p className="block text-gray-500 font-bold mb-1 pr-4">{choice.name}</p>
                                <Bar width={choice.count==0 ? 0 :choice.count*100/poll.total} active={active} />
                            </div>
                            {active && 
                                <p className="block text-gray-500 font-bold mb-1 pr-4">{choice.count}</p>
                            }
                            {session &&
                            <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded">Vote</button>
                            }
                        </div>
                    </div>
                )
            })}
            <div className="text-right text-sm">{poll.creator}</div>
        </div>
    );
}

export default Poll;