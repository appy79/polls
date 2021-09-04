import React from "react";
import RegisterForm from "../components/user/RegsiterForm";
import { useState } from "react";

function register() {

    const adduser = async (name, roll, pass) =>{
        const email = `${roll}@nitt.edu`
        var newPerson = {
            "email":email,
            "password":pass,
            "name":name
        }
      
        const response = await fetch("/api/member", {
            method: "POST",
            body: JSON.stringify(newPerson),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const res = await response.json();
    }



    return (
        <div>
            <RegisterForm onChange = {adduser} /> 
        </div>
    );
}

export default register;