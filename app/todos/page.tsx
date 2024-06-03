import { TodoList } from "@/components/todolist/TodoList";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mt-[5em]">
      <TodoList />
    </div>
  );
}
