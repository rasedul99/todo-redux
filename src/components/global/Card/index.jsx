import { Delete, Edit } from "@/components/icons";
import { Checkbox } from "@/components/ui";
import { BASE_URL } from "@/constants";
import { cn } from "@/lib/utils";

const Card = ({ todo, setTodos }) => {
  const { id, title, completed } = todo;

  const handleToggleComplete = async(id) => {
    try {
     const response = await fetch(`${BASE_URL}/todos/${id}`,{ method:"PATCH", body:JSON.stringify({completed:!completed}) })
     const data = await response.json()
     setTodos((prev) => prev.map((todo) => todo.id !== id ? todo : data ))
      
    } catch (error) {
      
    }
  }
  const handleDelete = async(id) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`,{ method:"DELETE" })
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
     
    } catch (error) {
      
    }
  };

  return (
    <div key={id} className="flex justify-between items-center gap-1">
      <div className="grow flex items-center gap-2">
        <Checkbox id={id} checked={completed} onClick = {()=> handleToggleComplete(id)}/>
        <label
          htmlFor={id}
          className={cn(
            `text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
            completed && "line-through"
          )}
        >
          {title}
        </label>
      </div>
      <Edit className="size-5 cursor-pointer hover:text-red-600" />
      <Delete
        className="size-5 cursor-pointer hover:text-red-600"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};

export default Card;
