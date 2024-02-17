import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import todoService from '@/services/todoService';
import { Todo } from '@/models/todo';

interface DeleteTodoProps {
  id: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ id, todos, setTodos }) => {
  const deleteTodo = async () => {
    try {
      await todoService.delete(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete the todo.');
    }
  };

  return (
    <button
      onClick={deleteTodo}
      className='text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded'
    >
      <AiFillDelete />
    </button>
  );
};

export default DeleteTodo;
