import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-500 h-full w-full'>
      <h1 className='text-center text-4xl'>Currency Converter App</h1>
    </div>
  )
}

export default App