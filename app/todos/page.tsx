import { TodoList } from "@/components/todolist/TodoList";
import { Tables } from "@/types/supabase";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .returns<Tables<"Todos">[]>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mt-[5em]">
      <TodoList todos={todos} />
    </div>
  );
}
