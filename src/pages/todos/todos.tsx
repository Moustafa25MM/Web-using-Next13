import { useState } from 'react';
import { Todo } from '@/models/todo';
import AddTodo from '@/components/AddTodo';
import ListTodos from '@/components/ListTodos';
import withAuth from '@/utils/withAuth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');

  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth?.logout();
    router.push('/auth/login');
  };

  const buttonBaseStyle =
    'flex-1 py-2 px-4 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const buttonActiveStyle = 'text-white bg-blue-600 hover:bg-blue-700';
  const buttonInactiveStyle = 'text-gray-700 bg-gray-100 hover:bg-gray-200';

  return (
    <div className='container mx-auto p-4'>
      <div className='absolute top-4 right-4'>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        >
          Logout
        </button>
      </div>
      <div className='flex flex-col items-center mb-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Todos</h1>
        <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
          <AddTodo todos={todos} setTodos={setTodos} />
        </div>
      </div>
      <div className='flex space-x-4 mb-4 justify-center'>
        <button
          onClick={() => setFilter('all')}
          className={`${buttonBaseStyle} ${
            filter === 'all' ? buttonActiveStyle : buttonInactiveStyle
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`${buttonBaseStyle} ${
            filter === 'completed' ? buttonActiveStyle : buttonInactiveStyle
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incompleted')}
          className={`${buttonBaseStyle} ${
            filter === 'incompleted' ? buttonActiveStyle : buttonInactiveStyle
          }`}
        >
          Uncompleted
        </button>
      </div>
      <ListTodos filter={filter} setTodos={setTodos} todos={todos} />
    </div>
  );
};

export default withAuth(Todos);
