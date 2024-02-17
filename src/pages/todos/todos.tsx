import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal from './modal';
import { Todo } from '@/models/todo';
import AddTodo from '@/components/AddTodo';
import ListTodos from '@/components/ListTodos';

const initialTodos = [
  { id: '1', name: 'First Todo', isCompleted: false },
  { id: '2', name: 'Second Todo', isCompleted: true },
];

const Todos = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all');

  return (
    <div className='container mx-auto px-4 todo-container'>
      <div className='flex justify-between items-center my-4'>
        <h1 className='text-2xl font-bold'>Todos</h1>
        <AddTodo todos={todos} setTodos={setTodos} />
      </div>
      <div className='flex space-x-4 mb-4'>
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 px-4 text-sm ${
            filter === 'all'
              ? 'text-white bg-blue-500'
              : 'text-gray-700 bg-white'
          } rounded-lg shadow-md`}
        >
          All Todos
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex-1 py-2 px-4 text-sm ${
            filter === 'completed'
              ? 'text-white bg-blue-500'
              : 'text-gray-700 bg-white'
          } rounded-lg shadow-md`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incompleted')}
          className={`flex-1 py-2 px-4 text-sm ${
            filter === 'incompleted'
              ? 'text-white bg-blue-500'
              : 'text-gray-700 bg-white'
          } rounded-lg shadow-md`}
        >
          Uncompleted
        </button>
      </div>
      <ListTodos filter={filter} setTodos={setTodos} todos={todos} />
    </div>
  );
};

export default Todos;
