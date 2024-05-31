"use client";

import { useState } from "react";
import { Switcher } from "../Switcher";
import { Tables } from "@/types/supabase";
import { DailyView } from "./components/views/DailyView";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AddTodoForm } from "../forms/addTodo/AddTodoForm";

interface TodoListProps {
  todos: Tables<"todos">[] | null;
}

function TodoList(props: TodoListProps): JSX.Element {
  const { todos } = props;

  const [dailyView, setDailyView] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-13 gap-x-2 justify-center">
        <div className="col-start-2 flex justify-center">
          <Switcher
            optionOne="Daily"
            optionTwo="General"
            dailyViewActive={dailyView}
            onSwitch={setDailyView}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-none ml-auto ">
              <span className="pr-2">Add Todo</span>
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add Todo</SheetTitle>
              <SheetDescription>Add a todo to your list</SheetDescription>
              <AddTodoForm />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {dailyView ? <DailyView todos={todos} /> : <></>}
    </div>
  );
}

export { TodoList };
