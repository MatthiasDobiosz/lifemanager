"use client";

import { Button } from "@/components/ui/button";

import { Todo } from "@/types/customTypes";
import { Check, Trash, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  const { todo, onDelete, onToggleStatus } = props;

  return (
    <div
      className={` border-2 w-[30vw] ${todo.status === "closed" ? "border-red-500" : "border-green-500"}`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div
            className={`ml-4  ${todo.status === "closed" ? "line-through" : ""}`}
          >
            {todo.description}
          </div>
          <div className={"ml-4 flex flex-row gap-4"}>
            {todo.startTime && <div>Start: {todo.startTime?.slice(0, 5)}</div>}
            {todo.endTime && <div>End: {todo.endTime?.slice(0, 5)}</div>}
          </div>
        </div>
        <div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(todo)}>
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onToggleStatus(
                todo.id,
                todo.status === "closed" ? "open" : "closed"
              )
            }
          >
            {todo.status === "closed" ? (
              <X className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { TodoItem };
