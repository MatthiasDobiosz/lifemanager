"use client";

import { useState } from "react";
import { Switcher } from "../Switcher";
import { Tables } from "@/types/supabase";
import { DailyView } from "./components/DailyView";

interface TodoListProps {
  todos: Tables<"Todos">[] | null;
}

function TodoList(props: TodoListProps): JSX.Element {
  const { todos } = props;

  const [dailyView, setDailyView] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center">
      <Switcher
        optionOne="Daily"
        optionTwo="General"
        dailyViewActive={dailyView}
        onSwitch={setDailyView}
      />
      {dailyView ? <DailyView todos={todos} /> : <></>}
    </div>
  );
}

export { TodoList };
