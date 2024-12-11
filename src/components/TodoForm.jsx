import { useState, useEffect } from 'react'

export default function TodoForm({ onSubmit, onCancel, initialTitle = '', initialTime = '' }) {
  const [title, setTitle] = useState(initialTitle)
  const [time, setTime] = useState(initialTime || new Date().toLocaleTimeString())

  useEffect(() => {
    if (!initialTime) {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString())
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [initialTime])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <input
          type="text"
          id="time"
          value={time}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  )
}

