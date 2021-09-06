import React from "react";
import RegisterForm from "../components/user/RegsiterForm";
import Router from 'next/router'


function register() {
    const adduser = async (name, roll, pass) =>{
        const email = `${roll}@nitt.edu`
        var newPerson = {
            "roll": roll,
            "email": email,
            "password": pass,
            "name": name
        }
      
        const response = await fetch("/api/users/member", {
            method: "POST",
            body: JSON.stringify(newPerson),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        Router.push('/auth/signin')
    }



    return (
        <div>
            <RegisterForm onChange = {adduser} /> 
        </div>
    );
}

export default register;