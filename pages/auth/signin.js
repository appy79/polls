import React, { useState } from "react";
import { getCsrfToken, getSession, signIn } from "next-auth/client";
import Router from "next/router";

function signin({csrfToken}) {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (e) => {

      e.preventDefault();

      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: pass,
      });
      if(res.ok){
        Router.push('/')
      }
      else{
        alert("Invalid Credentials")
      }
    }

    return (
        <div className="mx-auto bg-gray-100 p-8 rounded-xl w-max">
            <p className="text-3xl text-center font-bold p-3">SignIn</p>
            <div className="w-full max-w-sm">
                <form method="post" onSubmit={submit}>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-email"
                            >
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                          }}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            id="password"
                            name="password"
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

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <input
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        value="Sign In"
                        />
                    </div>
                </div>
                </form>  
            </div>
        </div>  
    );
}

export async function getServerSideProps (context){

  const {req, res} = context;
  const session = await (getSession({req}));

  if (session){
    res.writeHead(302, {
      Location:"/"
    });
    res.end();
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    } 
  }
}

export default signin;