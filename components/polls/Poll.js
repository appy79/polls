import React, {useState} from "react";
import Bar from "./Bar"

function Poll({title, total, values}) {

    const [active, setActive] = useState(false)

    return (
        <div className="text-white mx-auto">
            <p className="text-2xl">{title}</p>
            { values.map((value) => {
                return(
                    <div key={value.value} className="m-4">
                        <div className="pb-2">
                            <p>{value.choice}</p>
                        </div>
                        <div className="">
                            <Bar width={value.value*100/total} active={active} />
                        </div>
                    </div>
                )
            })}
            <div className="text-center">
                <button onClick={ () => { setActive(!active) }} className="border p-2 rounded-xl">{active ? "Hide" : "Show"} Results</button>
            </div>
        </div>
    );
}

export default Poll;