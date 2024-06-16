"use client";

import { TodoItem } from "./TodoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Todo } from "@/types/customTypes";

interface TodoItemListProps {
  todos: Todo[] | undefined;
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function TodoItemList(props: TodoItemListProps): JSX.Element {
  const { todos, onDelete, onToggleStatus } = props;

  const sortedTodos = todos?.sort((a) => (a.status === "open" ? -1 : 1));

  return (

      <ScrollArea className="border-black border-2 w-[40vw] h-[60vh]">
      <div className="flex flex-col items-center">   
        <div className="flex flex-col gap-4 mt-4">
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
