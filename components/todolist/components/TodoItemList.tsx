import { Tables } from "@/types/supabase";

interface TodoItemListProps {
  title: string;
  todos: Tables<"Todos">[] | undefined;
}

function TodoItemList(props: TodoItemListProps): JSX.Element {
  const { title, todos } = props;

  return (
    <div className="border-black border-2 w-[30em] h-[40em] flex flex-col items-center">
      <p className="text-2xl font-bold">{title}</p>
      <div className="flex flex-col">
        {todos?.map((todo) => <div key={todo.id}>{todo.name}</div>)}
      </div>
    </div>
  );
}

export { TodoItemList };
