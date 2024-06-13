"use client";

import { useTodosStore } from "@/providers/todos-store-provider";
import { TodoItemList } from "./TodoItemList";
import { Todo } from "@/types/customTypes";

interface DailyTodoItemsListProps {
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function DailyTodoItemsList(props: DailyTodoItemsListProps): JSX.Element {
  const { onDelete, onToggleStatus } = props;
  const todos = useTodosStore((state) => state.todos);

  const dailyTodos = todos?.filter((todo) => todo.type === "daily");

  return (
    <div>
      <TodoItemList
        title="Daily Todos"
        todos={dailyTodos}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
}

export { DailyTodoItemsList };
