import React, {useState} from "react";
import {useSpring, animated} from "react-spring";

function Bar({width, active, rc1, rc2}) {

    const vals =  useSpring({
        width: active? `${width}%` : `${0}%`,
        value: active? width : 0,
        backgroundColor: active ? "#Cea2fd" : "#9c51b6",
        config: {
            duration: 1000
        }
    });

    return (
                <div className="rounded-lg border-2 w-full h-1 text-center">
                    <animated.div className="rounded-lg h-1" style={vals} />
                </div>
    );
}


export default Bar;