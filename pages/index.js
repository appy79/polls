import Head from 'next/head'
import {signIn, signOut, useSession} from "next-auth/client"


export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="text-white">
      {!session && (
        <>
          Not Signed In<br/>
          <button onClick={signIn}>Sign In</button>
        </>
      )}
      {session && (
        <>
        Signed in as {session.user.email} <br/>
        <div> Access secrets </div>
        <button onClick={signOut} >Sign Out</button>
        </>
      )}
    </div>
  )
}
