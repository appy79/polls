import { session } from "next-auth/client";
import { useState } from "react";
import {signIn, signOut, useSession} from "next-auth/client"

function Header() {
  const [session, loading] = useSession();
  const [isOpen, setisOpen] = useState(false);

  function navHandle() {
    setisOpen(!isOpen);
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-0 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/"><span className="font-semibold text-xl tracking-tight">POLLS</span></a>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 text-white"
          onClick={navHandle}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto text-white ${
          isOpen ? "block" : "hidden"
        } `}
      >
        <div className="text-sm lg:flex-grow">
          {!session &&
            <> 
            <a
            href="/register"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Register
            </a>
            <a
            href="/auth/signin"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              SignIn
            </a>
            </>
          }
          {session && 
            <>
            <a 
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            href="/createpoll"
            >
              Create Poll
            </a>
            <button
            onClick={signOut}
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Logout
            </button>
            </>
          }
          
        </div>
        {session && <div>
          <a
            href="/update"
            className="inline-block text-sm px-4 py-2 leading-none text-white lg:mt-0"
          >
            {session.user.name}
          </a>
        </div>}
      </div>
    </nav>
  );
}

export default Header;
