"use client";

import { Progress } from "@/components/ui/progress";
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

  const sortedTodos = todos?.sort((a, b) => {
    if (a.status === "open" && b.status === "closed") {
      return -1;
    }
    if (a.status === "closed" && b.status === "open") {
      return 1;
    }

    if (a.startTime && b.startTime) {
      if (a.startTime < b.startTime) {
        return -1;
      }
      if (a.startTime > b.startTime) {
        return 1;
      }
    } else {
      a.startTime ? -1 : 1;
    }
    return 0;
  });
  const closedItems = sortedTodos?.filter(
    (item) => item.status === "closed"
  ).length;
  const openItems = sortedTodos?.filter(
    (item) => item.status === "open"
  ).length;
  const percentage =
    closedItems && sortedTodos
      ? Math.round((closedItems * 100) / sortedTodos?.length)
      : 0;

  return (
    <div className="border-black border-2 w-[40vw] h-[60vh] mt-2 flex flex-col">
      <ScrollArea className="h-[55vh]">
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
      <div className="flex flex-row justify-around items-center ml-4 mr-4">
        <div className="w-[5vw]">
          {percentage}% ({closedItems}/{openItems})
        </div>
        <Progress value={percentage} className="bg-red-400" />
      </div>
    </div>
  );
}

export { TodoItemList };
