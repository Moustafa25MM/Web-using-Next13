import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal, { Todo } from './modal';

const initialTodos = [
  { id: 1, title: 'First Todo', completed: false },
  { id: 2, title: 'Second Todo', completed: true },
];

const Todos = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
      setTodos([...todos, { id: newId, title: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter === 'uncompleted') {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  const openModal = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTodo(null);
    setIsModalOpen(false);
  };

  const saveTodo = (id: number, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
    closeModal();
  };

  return (
    <div className='container mx-auto px-4 todo-container'>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={currentTodo}
        onSave={saveTodo}
      />
      <div className='flex justify-between items-center my-4'>
        <h1 className='text-2xl font-bold'>Todos</h1>
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
          onClick={() => setFilter('uncompleted')}
          className={`flex-1 py-2 px-4 text-sm ${
            filter === 'uncompleted'
              ? 'text-white bg-blue-500'
              : 'text-gray-700 bg-white'
          } rounded-lg shadow-md`}
        >
          Uncompleted
        </button>
      </div>

      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className='flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-md'
          >
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className='form-checkbox h-4 w-4'
              />
              <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </span>
            </div>
            <div>
              <button
                onClick={() => {
                  openModal(todo);
                }}
                className='text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2'
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className='text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded'
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
