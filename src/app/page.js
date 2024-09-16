'use client';

import { Button, Input } from "@/components/ui";
import { useEffect, useState } from "react";
import Card from "@/components/global/Card";
import { BASE_URL, initialTodos } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTodos } from "@/lib/store/features/todos/todoSlice";

const Home = ()=> {
  const [input, setInput] = useState("");
  const {isLoading, todos, error } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchTodos())
  },[dispatch])

  return (
    <div className="max-w-96 mx-auto p-4 my-20 flex flex-col gap-4 bg-slate-300 rounded">
      <h3 className="text-3xl text-center">Todo</h3>
      <div className="flex gap-4">
        <Input onChange={(e)=>setInput(e.target.value)} value={input}/>
        <Button>Add</Button>
      </div>
      <div className="flex flex-col gap-4">
        {
          isLoading && <p className="text-sm leading-20 text-center">Loading</p> 
        }
        {
          !isLoading && todos.length > 0 && (
            todos.map((todo)=>(
              <Card key={todo.id} todo={todo}/>
             ))
          )
        }
        {
          error && <p className="text-sm leading-20 text-center">Something went wrong, Please try again.</p>
        }
      </div>
    </div>
  )
}

export default Home;