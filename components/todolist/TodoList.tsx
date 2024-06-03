"use client";

import { useState } from "react";
import { Switcher } from "../Switcher";
import { DailyView } from "./components/views/DailyView";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddTodoForm } from "../forms/addTodo/AddTodoForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTodosStore } from "@/providers/todos-store-provider";

function TodoList(): JSX.Element {
  const [dailyView, setDailyView] = useState(true);
  const todos = useTodosStore((state) => state.todos);

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none ml-auto ">
              <span className="pr-2">Add Todo</span>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[400px] sm:w-[540px]">
            <DialogHeader>
              <DialogTitle>Add Todo</DialogTitle>
              <DialogDescription>Add a todo to your list</DialogDescription>
              <AddTodoForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {dailyView ? <DailyView todos={todos} /> : <></>}
    </div>
  );
}

export { TodoList };
