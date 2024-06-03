import { createStore } from "zustand";
import { Tables } from "../types/supabase";

type TodosState = {
  todos: Tables<"todos">[];
};

type TodosActions = {
  setTodos: (todos: Tables<"todos">[]) => void;
  addTodo: (todo: Tables<"todos">) => void;
  removeTodo: () => void;
};

type TodosStore = TodosState & TodosActions;

const defaultInitState: TodosState = {
  todos: [],
};

const createTodosStore = (initState: TodosState = defaultInitState) => {
  return createStore<TodosStore>()((set) => ({
    ...initState,
    setTodos: (todos) => {
      set({ todos: todos });
    },
    addTodo: (todo) => {
      set((state) => ({ todos: [...state.todos, todo] }));
    },
    removeTodo: () => {},
  }));
};

export { createTodosStore };
export type { TodosStore };
