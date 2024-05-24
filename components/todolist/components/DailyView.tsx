import { Tables } from "@/types/supabase";
import { TodoItemList } from "./TodoItemList";

interface DailyViewProps {
  todos: Tables<"Todos">[] | null;
}

function DailyView(props: DailyViewProps): JSX.Element {
  const { todos } = props;

  const openTodos = todos?.filter((todo) => todo.status === "OPEN");
  const closedTodos = todos?.filter((todo) => todo.status === "CLOSED");

  return (
    <div className="flex flex-row gap-[20em] mt-5 ">
      <TodoItemList title="Open Todos" todos={openTodos} />
      <TodoItemList title="Closed Todos" todos={closedTodos} />
    </div>
  );
}

export { DailyView };
