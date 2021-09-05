import Head from 'next/head'
import {signIn, signOut, useSession} from "next-auth/client"
import AllPolls from '../components/polls/AllPolls';



export default function Home({data}) {
  const [session, loading] = useSession();
  return (
    <div className="text-white">
      <AllPolls polls={data.data} />
    </div>
  )
}

export async function getServerSideProps(ctx){
  const URL = process.env.NEXTAUTH_URL
  const response = await fetch(URL + "/api/polls");
  const data = await response.json();
  return {
    props: {
      data: data,
    },
  };
}
