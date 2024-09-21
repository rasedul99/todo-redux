"use client";

import { Button, Input } from "@/components/ui";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import Card from "@/components/global/Card";
import {
  useCreateTodoMutation,
  useGetTodosQuery,
} from "@/lib/store/features/todos/todoSlice";

const Home = () => {
  const [input, setInput] = useState("");
  const { data: todos = [], isLoading,isFetching, error } = useGetTodosQuery();
  const [createTodo, { isLoading: isCreating, isError: isCreatingError }] = useCreateTodoMutation();

  const uniqId = uuidv4();

  const handleAdd = async () => {
    if (!input) return;

    const newTodo = {
      id: uniqId,
      title: input,
      completed: false,
    };

    try {
      await createTodo(newTodo);
      setInput("");
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  return (
    <div className="max-w-96 mx-auto p-4 my-20 flex flex-col gap-4 bg-slate-300 rounded">
      <h3 className="text-3xl text-center">Todo</h3>
      <div className="flex gap-4">
        <Input onChange={(e) => setInput(e.target.value)} value={input} />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex flex-col gap-4">
        {(isLoading || isCreating || isFetching) && <p className="text-sm leading-20 text-center">Loading</p>}
        {!isLoading &&
          todos.length > 0 &&
          todos.map((todo) => <Card key={todo.id} todo={todo} />)}
        {(error || isCreatingError) && (
          <p className="text-sm leading-20 text-center">
            Something went wrong, Please try again.
          </p>
        )}
        {
          !isLoading && !isFetching && !error && todos.length === 0 && (
            <span className="text-sm leading-20 text-center">No Data </span>
          )
        }
      </div>
    </div>
  );
};

export default Home;
