import { Todo } from '@/models/todo';
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (id: string, title: string) => void;
}

const Modal = ({ isOpen, onClose, todo, onSave }: ModalProps) => {
  const [title, setTitle] = useState(todo ? todo.name : '');

  const handleSave = () => {
    if (todo) {
      onSave(todo.id, title.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>Edit Todo</h2>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter todo title'
          className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        />
        <div className='text-right space-x-4 mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
