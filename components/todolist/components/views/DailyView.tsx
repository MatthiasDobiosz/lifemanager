"use client";

import { TodoItemList } from "../TodoItemList";
import { Todo } from "@/types/customTypes";

interface DailyViewProps {
  todos: Todo[] | null;
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
