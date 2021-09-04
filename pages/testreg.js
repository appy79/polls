import React from "react";
import { useState } from "react";

function testreg() {

    const [nam, setNam] = useState("");
    const [pass, setPass] = useState("")

    const submit = (e) =>{
        e.preventDefault()
        if (!nam) {
        alert("No field can be left blank");
        } else{
        
        setNam("");
        }
    }
    return (
        <div className="mx-auto bg-gray-100 p-8 rounded-xl w-max">
        <p className="text-3xl text-center font-bold p-3">Update Details</p>
        <form className="w-full max-w-sm" onSubmit={submit}>
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
                >
                Full Name
                </label>
            </div>
            <div className="md:w-2/3">
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="nam"
                type="text"
                value={nam}
                onChange={(e) => {
                    setNam(e.target.value);
                }}
                />
            </div>
        </div>
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-pass"
                >
                Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="nam"
                type="password"
                value={pass}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
                />
            </div>
        </div>
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <input
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Update"
                />
            </div>
        </div>
        </form>
    </div>
    )
}

export default testreg;