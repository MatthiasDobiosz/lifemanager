"use client";

import { Tables } from "@/types/supabase";
import { TodoItemList } from "../TodoItemList";

interface DailyViewProps {
  todos: Tables<"todos">[] | null;
}

function DailyView(props: DailyViewProps): JSX.Element {
  const { todos } = props;

  const openTodos = todos?.filter((todo) => todo.status === "open");
  const closedTodos = todos?.filter((todo) => todo.status === "closed");

  return (
    <div className="flex flex-row gap-[10em] mt-5 ">
      <TodoItemList title="Open Todos" todos={openTodos} />
      <TodoItemList title="Closed Todos" todos={closedTodos} />
    </div>
  );
}

export { DailyView };
