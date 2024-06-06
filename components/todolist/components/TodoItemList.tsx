"use client";

import { TodoItem } from "./TodoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Todo } from "@/types/customTypes";

interface TodoItemListProps {
  title: string;
  todos: Todo[] | undefined;
}

function TodoItemList(props: TodoItemListProps): JSX.Element {
  const { title, todos } = props;

  return (
    <ScrollArea className="border-black border-2 w-[50em] h-[40em]">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold mb-6">{title}</p>
        <div className="flex flex-col gap-4">
          {todos?.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
        </div>
      </div>
    </ScrollArea>
  );
}

export { TodoItemList };
