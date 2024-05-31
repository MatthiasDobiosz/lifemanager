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

function AddTodoForm(): JSX.Element {
  const supabase: SupabaseClient<Database> = createClient();

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof addTodoSchema>) {
    const { error } = await supabase
      .from("todos")
      .insert({ name: formData.name, status: "open" });

    if (error) throw error;
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
        </div>
        <SheetClose asChild>
          <Button type="submit" className="mt-4">
            Create
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
}

export { AddTodoForm };
