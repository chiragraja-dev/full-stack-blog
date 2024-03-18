import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/MainLayout";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();
  console.log("ProtectedPage function is executing");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  console.log("hello")
  return (
    <div>my name is </div>
  );
}
