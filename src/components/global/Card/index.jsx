import { Delete, Edit } from "@/components/icons";
import { Checkbox } from "@/components/ui";
import {
  useDeleteTodoMutation,
  useToggleTodoMutation,
} from "@/lib/store/features/todos/todoSlice";
import { cn } from "@/lib/utils";

const Card = ({ todo }) => {
  const { id, title, completed } = todo;

  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleComplete] = useToggleTodoMutation();

  const handleDelete = () => {
    deleteTodo(id);
  };
  return (
    <div key={id} className="flex justify-between items-center gap-1">
      <div className="grow flex items-center gap-2">
        <Checkbox
          id={id}
          checked={completed}
          onClick={() => toggleComplete({ id, title, completed: !completed })}
        />
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
        onClick={handleDelete}
      />
    </div>
  );
};

export default Card;
