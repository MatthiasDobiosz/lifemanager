"use client";

import Link from "next/link";
import { Box } from "../Box";
import { BoxGroup } from "../BoxGroup";
import { Button } from "../ui/button";
import { Tables } from "@/types/supabase";
import { useTodosStore } from "@/providers/todos-store-provider";
import { useEffect } from "react";

interface DashboardProps {
  todos: Tables<"todos">[];
}

function Dashboard(props: DashboardProps): JSX.Element {
  const { todos } = props;
  const setTodos = useTodosStore((state) => state.setTodos);

  useEffect(() => {
    setTodos(todos);
  }, [todos, setTodos]);

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
