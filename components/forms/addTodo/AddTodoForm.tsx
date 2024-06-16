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
import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useTodosStore } from "@/providers/todos-store-provider";
import { NewTodo } from "@/types/customTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddTodoForm(): JSX.Element {
  const supabase: SupabaseClient<Database> = createClient();
  const addTodoToState = useTodosStore((state) => state.addTodo);
  const selectedDate = useTodosStore((state) => state.selectedDate);
  const userId = useTodosStore((state) => state.userId);

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      type: "daily",
      description: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof addTodoSchema>) {
    const newTodo: NewTodo = {
      status: "open",
      type: formData.type,
      description: formData.description,
      date: new Date(selectedDate).toISOString(),
    };

    const { data, error } = await supabase
      .from("todos")
      .insert({...newTodo, user_id: userId})
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="daily">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
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
