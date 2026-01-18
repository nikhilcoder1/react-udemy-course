import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

/*
========================================
📌 TODO APP – COMPLETE FLOW (Context + localStorage)
========================================

1️⃣ STATE OWNERSHIP (App.jsx)
----------------------------------------
- The main todos state lives in App.jsx using useState.
- App.jsx acts as the SINGLE SOURCE OF TRUTH.
- All CRUD operations (add, update, delete, toggle) are defined here.

    const [todos, setTodos] = useState([])

----------------------------------------

2️⃣ CONTEXT CREATION (TodoContext.js)
----------------------------------------
- TodoContext is created using createContext().
- It defines the SHAPE (contract) of global data and actions:
    - todos
    - addTodo
    - updateTodo
    - deleteTodo
    - toggleComplete

- A custom hook `useTodo()` wraps useContext(TodoContext)
  for clean and reusable access across components.

----------------------------------------

3️⃣ CONTEXT PROVIDER (App.jsx)
----------------------------------------
- App.jsx wraps the UI with <TodoProvider>.
- The provider exposes:
    {
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete
    }

- Any component inside the provider tree can now
  access and modify todos without prop drilling.

----------------------------------------

4️⃣ ADDING A TODO (TodoForm.jsx)
----------------------------------------
- TodoForm maintains LOCAL state for the input field.
- On form submit:
    - preventDefault() is called
    - empty todos are prevented
    - addTodo() is called via Context
    - input field is cleared

- The actual todos state update happens in App.jsx,
  not inside the form component.

----------------------------------------

5️⃣ DISPLAYING TODOS (App.jsx)
----------------------------------------
- App.jsx maps over the todos array.
- Each todo is passed to a TodoItem component.
- TodoItem receives only ONE todo object as a prop.

----------------------------------------

6️⃣ UPDATING / TOGGLING / DELETING (TodoItem.jsx)
----------------------------------------
- TodoItem consumes Context using useTodo().
- Local UI state is used for edit mode and input text.
- Actions:
    - updateTodo(id, updatedTodo)
    - toggleComplete(id)
    - deleteTodo(id)

- State updates remain IMMUTABLE using map() and filter().

----------------------------------------

7️⃣ localStorage INTEGRATION
----------------------------------------
- On initial app mount:
    - Todos are loaded from localStorage
    - State is hydrated if data exists

- On every todos state change:
    - Todos are saved to localStorage

- This ensures data persistence across page refreshes.

----------------------------------------

8️⃣ DATA FLOW SUMMARY
----------------------------------------
UI Event → Context Function → App State Update → Re-render → localStorage Sync

- Data flows in ONE direction.
- Context shares state, App owns it.
- Components remain clean and reusable.

========================================
*/


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App;