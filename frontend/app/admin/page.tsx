import AdminPanel from "@/components/admin";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_OPTIONS } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await getServerSession(NEXT_AUTH_OPTIONS);

  console.log("PWGE ", data)
  if (!data?.user) {
    redirect("/");
  }

  return (
    <div>
      <AdminPanel />
    </div>
  );
}
