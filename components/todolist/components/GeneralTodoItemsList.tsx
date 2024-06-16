"use client";

import { useTodosStore } from "@/providers/todos-store-provider";
import { TodoItemList } from "./TodoItemList";
import { Todo } from "@/types/customTypes";

interface GeneralTodoItemsListProps {
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function GeneralTodoItemsList(props: GeneralTodoItemsListProps): JSX.Element {
  const { onDelete, onToggleStatus } = props;
  const todos = useTodosStore((state) => state.todos);

  const generalTodos = todos?.filter((todo) => todo.type === "general");

  return (
    <div className="flex flex-col justify-center">
    <p className="text-2xl font-bold mb-2 self-center">General Todos</p>
      <TodoItemList
        todos={generalTodos}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
}

export { GeneralTodoItemsList };
