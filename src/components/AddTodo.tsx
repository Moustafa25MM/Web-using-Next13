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
      } catch (error) {
        console.error('Failed to add todo:', error);
        toast.error('Failed to add todo');
      }
    } else {
      toast.warn('Please enter a todo');
    }
  };

  return (
    <div>
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Add a new todo'
        className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
      />
      <button
        onClick={addTodo}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
