"use client";

import { TodoItem } from "./TodoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Todo } from "@/types/customTypes";

interface TodoItemListProps {
  title: string;
  todos: Todo[] | undefined;
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function TodoItemList(props: TodoItemListProps): JSX.Element {
  const { title, todos, onDelete, onToggleStatus } = props;

  const sortedTodos = todos?.sort((a) => (a.status === "open" ? -1 : 1));

  return (
    <ScrollArea className="border-black border-2 w-[50em] h-[40em]">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold mb-6">{title}</p>
        <div className="flex flex-col gap-4">
          {sortedTodos?.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

export { TodoItemList };
