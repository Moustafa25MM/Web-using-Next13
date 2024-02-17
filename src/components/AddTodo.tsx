import { useState } from 'react';
import { Todo } from '@/models/todo';
import todoService from '@/services/todoService';
import { toast } from 'react-toastify';

interface AddTodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const newTodoItem = await todoService.create(newTodo);
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
        toast.success('Todo created successfully!');
      } catch (error: any) {
        if (error.response.status === 409) {
          return toast.error(
            'Failed to add todo, you already have one with the same name'
          );
        }
        toast.error('Failed to add todo');
      }
    } else {
      toast.warn('Please enter a todo');
    }
  };

  return (
    <div className='flex justify-center items-center space-x-2'>
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Add a new todo'
        className='flex-1 border-2 border-gray-300 bg-white h-10 px-8 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button
        onClick={addTodo}
        className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none font-medium rounded-r-lg text-sm px-5 h-10 transition-colors duration-200'
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
