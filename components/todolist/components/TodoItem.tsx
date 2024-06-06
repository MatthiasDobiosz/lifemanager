"use client";

import { Todo } from "@/types/customTypes";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  const { todo } = props;

  return (
    <div className="border-black border-2 w-[30em] flex flex-col items-center">
      <div className="flex flex-row">
        <div className="mr-2">Name:</div> <div>{todo.name}</div>
      </div>
      <div className="flex flex-row">
        <div className="mr-2">Description:</div> <div>{todo.description}</div>
      </div>
    </div>
  );
}

export { TodoItem };
