import React, {useState} from "react";
import {useSpring, animated} from "react-spring";

function Bar({width, active, rc1, rc2}) {

    const vals =  useSpring({
        width: active? `${width}%` : `${0}%`,
        value: active? width : 0,
        backgroundColor: active ? "blue" : "navy",
        config: {
            duration: 1000
        }
    });

    return (
                <div className="rounded-sm border w-full">
                    <animated.div className="rounded-sm " style= {vals}>{vals.value.to(x => Math.floor(x))}</animated.div>
                </div>
    );
}


export default Bar;