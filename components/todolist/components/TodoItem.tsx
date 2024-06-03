"use client";

import { Tables } from "@/types/supabase";

interface TodoItemProps {
  todo: Tables<"todos">;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  const { todo } = props;

  return <div>{todo.name}</div>;
}

export { TodoItem };
