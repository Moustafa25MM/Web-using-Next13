import axios from 'axios';
import { Todo } from '../models/todo';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
  return localStorage.getItem('token') || null;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const todoService = {
  list: async () => {
    const response = await axiosInstance.get<Todo[]>('/todo/find/all');
    return response.data;
  },

  listCompleted: async () => {
    const response = await axiosInstance.get<Todo[]>('/todo/completed/all');
    return response.data;
  },

  listIncompleted: async () => {
    const response = await axiosInstance.get<Todo[]>('/todo/incompleted/all');
    return response.data;
  },

  create: async (name: string) => {
    const response = await axiosInstance.post('/todo/create', { name });
    return response.data.todo;
  },

  update: async (id: string, name: string) => {
    const response = await axiosInstance.put(`/todo/update/${id}`, { name });
    return response.data.todo;
  },

  toggle: async (id: string) => {
    const response = await axiosInstance.get<Todo>(`/todo/get/${id}`);
    const updatedTodo = await axiosInstance.put(`/todo/toggle/${id}`, {
      isCompleted: !response.data.isCompleted,
    });
    return updatedTodo.data.todo;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/todo/delete/${id}`);
  },
};

export default todoService;
