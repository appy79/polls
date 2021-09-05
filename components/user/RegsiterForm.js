import React from "react";
import { useState } from "react";

function RegisterForm(props) {

    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [pass, setPass] = useState("");
    const [passconf, setPassconf] = useState("");
    const [code, setCode] = useState("");

    const [sent, setSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [fcode, setFcode] = useState("")


    const mail = async (e) => {
        const email = `${roll}@nitt.edu`;
        var data = {
            "email":email
        }
        const response = await fetch("/api/users/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        if(res.success){
            setFcode(res.code);
            setSent(true);
            alert("Email has been sent to your webmail. Please check the code received.");
        }
        else{
            alert("User already exists!");
        }
    }

    const verify = (e) => {
        if(code==fcode){
            setVerified(true);
        }
        else{
            alert("Code entered is wrong. Please try again.");
        }
    }

    const register = (e) =>{
        e.preventDefault()
        if (!name || !roll || !pass || !passconf) {
            alert("No field can be left blank");
        } 
        else if(pass !== passconf){
            alert("Passwords Don't match");
        }
        else{
            props.onChange(name, roll, pass);
            setName("");
            setRoll("");
            setPass("");
            setPassconf("");
        }
    }
    return (
        <div className="mx-auto bg-gray-100 p-8 rounded-xl w-max">
        <p className="text-3xl text-center font-bold p-3">Register</p>
        <div className="w-full max-w-sm">

        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-roll"
                    >
                    Roll Num
                </label>
            </div>
            <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="roll"
                    type="text"
                    disabled={sent}
                    value={roll}
                    onChange={(e) => {
                        setRoll(e.target.value);
                    }}
                />
            </div>
        </div>

        { !sent &&
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <input
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Send Mail"
                onClick = {mail}
                />
            </div>
        </div>
        }

        {sent && !verified && 
        <>

        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-code"
                >
                Code
                </label>
            </div>
            <div className="md:w-2/3">
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="code"
                type="text"
                value={code}
                onChange={(e) => {
                    setCode(e.target.value);
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
                value="Verify"
                onClick = {verify}
                />
            </div>
        </div>
        </>
        }

        { verified && 
        <>
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
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
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
                id="pass"
                type="password"
                value={pass}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
                />
            </div>
        </div>

        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-pass-conf"
                >
                Confirm Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="pass-conf"
                type="password"
                value={passconf}
                onChange={(e) => {
                    setPassconf(e.target.value);
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
                value="Register"
                onClick = {register}
                />
            </div>
        </div>
        </> }
        </div>
    </div>
    )
}

export default RegisterForm;