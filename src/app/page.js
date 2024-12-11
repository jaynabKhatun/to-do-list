'use client'

import { useState } from 'react'
import { PlusCircle, Trash2, Edit2 } from 'lucide-react'
import TodoForm from '@/components/TodoForm'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const addTodo = (title, time) => {
    const newTodo = { id: Date.now(), title, time }
    setTodos([...todos, newTodo])
    setIsFormOpen(false)
  }

  const updateTodo = (id, title, time) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title, time } : todo))
    setEditingTodo(null)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My To-Do List</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center mb-6"
        >
          <PlusCircle className="mr-2" size={20} />
          Create To-do
        </button>
        {isFormOpen && (
          <TodoForm onSubmit={addTodo} onCancel={() => setIsFormOpen(false)} />
        )}
        {editingTodo && (
          <TodoForm
            onSubmit={(title, time) => updateTodo(editingTodo.id, title, time)}
            onCancel={() => setEditingTodo(null)}
            initialTitle={editingTodo.title}
            initialTime={editingTodo.time}
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{todo.title}</td>
                  <td className="py-2 px-4 border-b">{todo.time}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

