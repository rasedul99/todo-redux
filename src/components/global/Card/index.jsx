import { Delete, Edit } from "@/components/icons";
import { Checkbox } from "@/components/ui";
import { deleteTodo, toggleComplete } from "@/lib/store/features/todos/todoSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const Card = ({ todo}) => {
  const { id, title, completed } = todo;

  const dispatch = useAppDispatch();
  return (
    <div key={id} className="flex justify-between items-center gap-1">
      <div className="grow flex items-center gap-2">
        <Checkbox id={id} checked={completed} onClick = {()=> dispatch(toggleComplete({id,title,completed}))}/>
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
        onClick={() => dispatch(deleteTodo(id))}
      />
    </div>
  );
};

export default Card;
