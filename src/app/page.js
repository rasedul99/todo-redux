'use client';

import { Button, Input } from "@/components/ui";
import { useEffect, useState } from "react";
import Card from "@/components/global/Card";
import { BASE_URL } from "@/constants";

const Home = ()=> {
  const [todos, setTodos] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${BASE_URL}/todos`);
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        setError(error);
      }
    };
    fetchTodos() 
  },[])

  console.log({todos})

  return (
    <div className="max-w-96 mx-auto p-4 my-20 flex flex-col gap-4 bg-slate-300 rounded">
      <h3 className="text-3xl text-center">Todo</h3>
      <div className="flex gap-4">
        <Input onChange={(e)=>setInput(e.target.value)} value={input}/>
        <Button>Add</Button>
      </div>
      <div className="flex flex-col gap-4">
        {
          todos?.map((todo)=>(
           <Card key={todo.id} todo={todo} setTodos={setTodos}/>
          ))
        }
      </div>
    </div>
  )
}

export default Home;