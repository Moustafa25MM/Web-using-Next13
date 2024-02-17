import { toast } from 'react-toastify';
import todoService from '@/services/todoService';
import { Todo } from '@/models/todo';

interface ToggleTodoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToggleTodo: React.FC<ToggleTodoProps> = ({ todo, todos, setTodos }) => {
  const todoStatus = todo.isCompleted ? 'back to be InCompleted' : 'Completed';
  const toggleTodo = async () => {
    try {
      const updatedTodo = await todoService.toggle(todo.id);
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? updatedTodo : t
      );
      setTodos(updatedTodos);
      toast.success(`Todo is ${todoStatus}`);
    } catch (error) {
      toast.error('Failed to toggle the todo.');
    }
  };

  return (
    <input
      type='checkbox'
      checked={todo.isCompleted}
      onChange={toggleTodo}
      className='form-checkbox h-4 w-4'
    />
  );
};

export default ToggleTodo;
