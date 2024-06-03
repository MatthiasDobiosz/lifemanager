"use client";

import { Tables } from "@/types/supabase";
import { TodoItem } from "./TodoItem";

interface TodoItemListProps {
  title: string;
  todos: Tables<"todos">[] | undefined;
}

function TodoItemList(props: TodoItemListProps): JSX.Element {
  const { title, todos } = props;

  return (
    <div className="border-black border-2 w-[50em] h-[40em] flex flex-col items-center">
      <p className="text-2xl font-bold">{title}</p>
      <div className="flex flex-col">
        {todos?.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
      </div>
    </div>
  );
}

export { TodoItemList };
