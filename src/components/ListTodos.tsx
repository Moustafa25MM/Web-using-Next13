import { useEffect } from 'react';
import { Todo } from '@/models/todo';
import todoService from '@/services/todoService';
import DeleteTodo from './DeleteTodo';
import ToggleTodo from './ToggleTodo';
import EditTodo from './EditTodo';

interface ListTodosProps {
  filter: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const ListTodos: React.FC<ListTodosProps> = ({ filter, setTodos, todos }) => {
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
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, [filter, setTodos]);

  return (
    <div>
      {todos.map((todo: Todo) => (
        <div
          key={todo.id}
          className='flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-md'
        >
          <div className='flex items-center'>
            <ToggleTodo todo={todo} todos={todos} setTodos={setTodos} />
            <span className={`ml-2 ${todo.isCompleted ? 'line-through' : ''}`}>
              {todo.name}
            </span>
          </div>
          <div>
            <EditTodo todo={todo} todos={todos} setTodos={setTodos} />
            <DeleteTodo id={todo.id} todos={todos} setTodos={setTodos} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTodos;
