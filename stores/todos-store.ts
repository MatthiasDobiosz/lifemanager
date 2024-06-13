import { createStore } from "zustand";
import { Todo } from "@/types/customTypes";
import { createJSONStorage, persist } from "zustand/middleware";

type TodosState = {
  todos: Todo[];
};

type TodosActions = {
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  toggleStatus: (id: number, status: Todo["status"]) => void;
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
        removeTodo: (todo) => {
          set((state) => ({
            todos: [...state.todos.filter((td) => td.id !== todo.id)],
          }));
        },
        toggleStatus: (id, status) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, status } : todo
            ),
          }));
        },
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
