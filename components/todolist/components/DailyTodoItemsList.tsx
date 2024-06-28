"use client";

import { useTodosStore } from "@/providers/todos-store-provider";
import { TodoItemList } from "./TodoItemList";
import { Todo } from "@/types/customTypes";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dateToString } from "@/utils/dateTimeUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DailyTodoItemsListProps {
  onDelete: (todo: Todo) => void;
  onToggleStatus: (id: number, status: Todo["status"]) => void;
}

function DailyTodoItemsList(props: DailyTodoItemsListProps): JSX.Element {
  const { onDelete, onToggleStatus } = props;

  const selectedDate = useTodosStore((state) => state.selectedDate);
  const setSelectedDate = useTodosStore((state) => state.setSelectedDate);
  const todos = useTodosStore((state) => state.todos);

  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setCurrentTodos(
      todos
        .filter((todo) => todo.type === "daily")
        .filter(
          (todo) =>
            new Date(todo.date).toDateString() ===
            new Date(selectedDate).toDateString()
        )
    );
  }, [selectedDate, todos]);

  function setNewDate(date: Date | undefined): void {
    if (date) {
      setSelectedDate(date.toString());
    }
  }

  function setDateToNextDay() {
    const currentDay = new Date(selectedDate);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(currentDay.getDate() + 1);
    setSelectedDate(nextDay.toString());
  }

  function setDateToPreviousDay() {
    const currentDay = new Date(selectedDate);
    const previousDay = new Date(selectedDate);
    previousDay.setDate(currentDay.getDate() - 1);
    setSelectedDate(previousDay.toString());
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <Button size="icon" onClick={() => setDateToPreviousDay()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <p className="text-2xl font-bold mb-2 self-center">Daily Todos</p>
          <div className="flex flex-row gap-2">
            <div className="self-center font-bold">
              {selectedDate && dateToString(selectedDate)}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <PopoverClose>
                  <Calendar
                    mode="single"
                    selected={new Date(selectedDate)}
                    onSelect={(day) => setNewDate(day)}
                    initialFocus
                  />
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </div>
          <Button size="icon" onClick={() => setDateToNextDay()}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <TodoItemList
          todos={currentTodos}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      </div>
      <div className="self-center">
        <Link href="/todos/dailystats">
          <Button size="lg" className="w-60">
            <span className="pr-2">Daily Statistics</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { DailyTodoItemsList };
