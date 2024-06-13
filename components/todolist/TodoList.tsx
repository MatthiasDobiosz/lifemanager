"use client";

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

import { DailyTodoItemsList } from "./components/DailyTodoItemsList";
import { GeneralTodoItemsList } from "./components/GeneralTodoItemsList";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { Todo } from "@/types/customTypes";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import { useTodosStore } from "@/providers/todos-store-provider";

function TodoList(): JSX.Element {
  const supabase: SupabaseClient<Database> = createClient();
  const removeTodo = useTodosStore((state) => state.removeTodo);
  const toggleStatus = useTodosStore((state) => state.toggleStatus);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, SetTodoToDelete] = useState<Todo>();

  function onDeleteTodo(todo: Todo): void {
    setShowDeleteModal(true);
    SetTodoToDelete(todo);
  }

  async function onDeleteHandler() {
    setShowDeleteModal(false);

    if (todoToDelete) {
      await supabase.from("todos").delete().eq("id", todoToDelete.id);
      removeTodo(todoToDelete);
    }
  }

  function onCancelHandler() {
    setShowDeleteModal(false);
    SetTodoToDelete(undefined);
  }

  async function onToggleStatus(id: number, status: Todo["status"]) {
    const { data, error } = await supabase
      .from("todos")
      .update({ status })
      .eq("id", id)
      .single();
    console.log(data);
    if (error) {
      console.error("Error updating todo status:", error);
      return;
    }

    toggleStatus(id, status);
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-13 gap-x-2 justify-center">
        <div className="col-start-2 flex justify-center">
          <h1>Date placeholder</h1>
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

      <div className="flex flex-row gap-[10em] mt-5 ">
        <DailyTodoItemsList
          onDelete={onDeleteTodo}
          onToggleStatus={onToggleStatus}
        />
        <GeneralTodoItemsList
          onDelete={onDeleteTodo}
          onToggleStatus={onToggleStatus}
        />
      </div>

      {showDeleteModal && (
        <DeleteModal
          title="Are you sure?"
          onDelete={() => onDeleteHandler()}
          onCancel={() => onCancelHandler()}
          open={showDeleteModal}
          deleteConfirm="Delete Todo"
          description={"The todo will be deleted permanently."}
        />
      )}
    </div>
  );
}

export { TodoList };
