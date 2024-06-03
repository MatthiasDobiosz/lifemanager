"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type TodosStore, createTodosStore } from "@/stores/todos-store";

const TodosStoreContext = createContext<StoreApi<TodosStore> | null>(null);

interface TodosStoreProviderProps {
  children: ReactNode;
}

const TodosStoreProvider = ({ children }: TodosStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TodosStore>>();
  if (!storeRef.current) {
    storeRef.current = createTodosStore();
  }

  return (
    <TodosStoreContext.Provider value={storeRef.current}>
      {children}
    </TodosStoreContext.Provider>
  );
};
const useTodosStore = <T,>(selector: (store: TodosStore) => T): T => {
  const todosStoreContext = useContext(TodosStoreContext);

  if (!todosStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(todosStoreContext, selector);
};

export { TodosStoreProvider, useTodosStore };
