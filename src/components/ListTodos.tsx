import { useState, useEffect } from 'react';
import { Todo } from '@/models/todo';
import todoService from '@/services/todoService';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal from '@/pages/todos/modal';

interface ListTodosProps {
  filter: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ListTodos: React.FC<ListTodosProps> = ({ filter, setTodos }) => {
  const [todos, setLocalTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      let fetchedTodos: Todo[] = [];
      switch (filter) {
        case 'completed':
          fetchedTodos = await todoService.listCompleted();
          break;
        case 'incompleted':
          fetchedTodos = await todoService.listIncompleted();
          break;
        default:
          fetchedTodos = await todoService.list();
          break;
      }
      setLocalTodos(fetchedTodos);
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, [filter, setTodos]);

  const toggleTodo = async (id: string) => {
    const updatedTodo = await todoService.toggle(id);
    setLocalTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id: string) => {
    await todoService.delete(id);
    setLocalTodos(todos.filter((todo) => todo.id !== id));
  };

  //   const openModal = (todo: Todo) => {
  //     setCurrentTodo(todo);
  //     setIsModalOpen(true);
  //   };

  //   const closeModal = () => {
  //     setCurrentTodo(null);
  //     setIsModalOpen(false);
  //   };

  //   const saveTodo = async (id: string, name: string) => {
  //     const updatedTodo = await todoService.update(id, name);
  //     setLocalTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  //     closeModal();
  //   };

  return (
    <div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={currentTodo}
        onSave={saveTodo}
      /> */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className='flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-md'
        >
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
              className='form-checkbox h-4 w-4'
            />
            <span className={`ml-2 ${todo.isCompleted ? 'line-through' : ''}`}>
              {todo.name}
            </span>
          </div>
          <div>
            {/* <button
              onClick={() => openModal(todo)}
              className='text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2'
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className='text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded'
            >
              <AiFillDelete />
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTodos;
