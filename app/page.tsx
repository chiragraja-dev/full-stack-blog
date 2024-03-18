import DeployButton from "../components/DeployButton";
import AuthButton from "../components/MainLayout";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div>
      <h1>Hello, this is Home page</h1>
      <Link className=" bg-sky-400 p-2 rounded-sm" href={"/login"}>Login</Link>
    </div>
  );
}
