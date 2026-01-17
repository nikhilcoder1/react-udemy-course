import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='text-white text-3xl text-center p-4'>Todo List : Using LocalStorage + ContextAPI</h1>
    </div>
  )
}

export default App
