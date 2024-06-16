"use client";

import Link from "next/link";
import { Box } from "../Box";
import { BoxGroup } from "../BoxGroup";
import { Button } from "../ui/button";
import { useTodosStore } from "@/providers/todos-store-provider";
import { useEffect } from "react";
import { Todo } from "@/types/customTypes";

interface DashboardProps {
  todos: Todo[];
  userId: string;
}

function Dashboard(props: DashboardProps): JSX.Element {
  const { todos, userId } = props;
  const setTodos = useTodosStore((state) => state.setTodos);
  const setUserId = useTodosStore((state) => state.setUserId);

  useEffect(() => {
    setTodos(todos);
    setUserId(userId)
  }, [todos, setTodos, userId, setUserId]);

  return (
    <div className="flex flex-col gap-6">
      <BoxGroup>
        <Box>
          <p>List of Todos</p>
          <Button>
            <Link href="todos">Hey there</Link>
          </Button>
        </Box>
        <Box>
          <Link href="/finances">Financial stuff</Link>{" "}
        </Box>
        <Box> Placeholder 1 </Box>
      </BoxGroup>
      <BoxGroup>
        <Box> Placeholder 2 </Box>
        <Box> Placeholder 3 </Box>
        <Box> Placeholder 4 </Box>
      </BoxGroup>
    </div>
  );
}

export { Dashboard };
