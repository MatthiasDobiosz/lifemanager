"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodoSchema } from "./schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useTodosStore } from "@/providers/todos-store-provider";
import { NewTodo } from "@/types/customTypes";

function AddTodoForm(): JSX.Element {
  const supabase: SupabaseClient<Database> = createClient();
  const addTodoToState = useTodosStore((state) => state.addTodo);

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof addTodoSchema>) {
    const newTodo: NewTodo = {
      name: formData.name,
      status: "open",
      description: formData.description,
    };
    const { data, error } = await supabase
      .from("todos")
      .insert(newTodo)
      .select()
      .single();

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

    if (data) {
      addTodoToState(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <SheetClose asChild>
          <Button type="submit" className="mt-4 w-full">
            Create
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
}

export { AddTodoForm };
