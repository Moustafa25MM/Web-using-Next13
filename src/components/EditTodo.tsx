import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import todoService from '@/services/todoService';
import { Todo } from '@/models/todo';
import Modal from '@/pages/todos/modal';

interface EditTodoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, todos, setTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveTodo = async (id: string, name: string) => {
    try {
      const updatedTodo = await todoService.update(id, name);
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(updatedTodos);
      toast.success('Todo updated successfully!');
      closeModal();
    } catch (error) {
      toast.error('Failed to update the todo.');
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className='text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2'
      >
        <AiFillEdit />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={todo}
        onSave={saveTodo}
      />
    </>
  );
};

export default EditTodo;
