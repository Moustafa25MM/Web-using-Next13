import React, { useState } from 'react';

export interface Todo {
  id: number;
  title: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (id: number, title: string) => void;
}

const Modal = ({ isOpen, onClose, todo, onSave }: ModalProps) => {
  const [title, setTitle] = useState(todo ? todo.title : '');

  if (!isOpen) return null;

  console.log(title);
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded'>
        <h2 className='text-xl mb-4'>Edit Todo</h2>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none'
        />
        <div className='text-right space-x-4 mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (todo) {
                onSave(todo.id, title);
              }
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
