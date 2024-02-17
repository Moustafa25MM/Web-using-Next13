import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal from './modal';
import { Todo } from '@/models/todo';
import AddTodo from '@/components/AddTodo';

const initialTodos = [
  { id: '1', name: 'First Todo', isCompleted: false },
  { id: '2', name: 'Second Todo', isCompleted: true },
];

const Todos = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  //   const toggleTodo = (id: number) => {
  //     setTodos(
  //       todos.map((todo) =>
  //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //       )
  //     );
  //   };

  //   const deleteTodo = (id: number) => {
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   };

  //   const getFilteredTodos = () => {
  //     if (filter === 'completed') {
  //       return todos.filter((todo) => todo.completed);
  //     } else if (filter === 'uncompleted') {
  //       return todos.filter((todo) => !todo.completed);
  //     }
  //     return todos;
  //   };

  //   const filteredTodos = getFilteredTodos();

  //   const openModal = (todo: Todo) => {
  //     setCurrentTodo(todo);
  //     setIsModalOpen(true);
  //   };

  //   const closeModal = () => {
  //     setCurrentTodo(null);
  //     setIsModalOpen(false);
  //   };

  //   const saveTodo = (id: number, title: string) => {
  //     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  //     closeModal();
  //   };

  return (
    <div className='container mx-auto px-4 todo-container'>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={currentTodo}
        onSave={saveTodo}
      /> */}
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

      {/* <div>
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
      </div> */}
    </div>
  );
};

export default Todos;
