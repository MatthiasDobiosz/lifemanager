import { Dashboard } from "@/components/dashboard/Dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return <div> Error </div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center mt-[5em]">
      <Dashboard todos={todos} />
    </div>
  );
}
