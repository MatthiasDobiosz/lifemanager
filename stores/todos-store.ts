import { createStore } from "zustand";
import { Todo } from "@/types/customTypes";
import { createJSONStorage, persist } from "zustand/middleware";

type TodosState = {
  todos: Todo[];
};

type TodosActions = {
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: () => void;
};

type TodosStore = TodosState & TodosActions;

const defaultInitState: TodosState = {
  todos: [],
};

const createTodosStore = (initState: TodosState = defaultInitState) => {
  return createStore<TodosStore>()(
    persist(
      (set) => ({
        ...initState,
        setTodos: (todos) => {
          set({ todos: todos });
        },
        addTodo: (todo) => {
          set((state) => ({ todos: [...state.todos, todo] }));
        },
        removeTodo: () => {},
      }),
      {
        name: "todo-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export { createTodosStore };
export type { TodosStore };
