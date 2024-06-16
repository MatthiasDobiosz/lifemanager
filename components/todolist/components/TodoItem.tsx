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
    <div className="border-black border-2 w-[30vw]">
      <div className="flex flex-row justify-between">
        <div
          className={`ml-4 self-center ${todo.status === "closed" ? "line-through" : ""}`}
        >
          {todo.description}
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
