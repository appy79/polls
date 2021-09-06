import React, {useState} from "react";
import Bar from "./Bar"

function Poll({poll}) {
    const [active, setActive] = useState(false)

    return (
        <div className="text-white mx-auto">
            <p className="text-2xl">{poll.title}</p>
            { poll.choices.map((choice) => {
                
                return(
                    <div key={choice._id} className="m-4">
                        <div className="pb-2">
                            <p>{choice.name}</p>
                        </div>
                        <div className="flex">
                            <Bar width={choice.count*100/poll.total} active={active} />
                            <button className="border ml-2 px-1 rounded-sm">Vote</button>
                        </div>
                    </div>
                )
            })}
            <div className="text-center">
                <button onClick={ () => { setActive(!active) }} className="border p-2 rounded-xl">{active ? "Hide" : "Show"} Results</button>
            </div>
            <div className="text-right text-sm">Poll by {poll.creator}</div>
        </div>
    );
}

export default Poll;