import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

export function App() {

  const [counter , setcounter] = useState(0); // counter : is a variable , setcounter : is a function

  // let counter = 10;

  const addValue = () => {
    // to prevent batching in react using previousCounter    
    setcounter((prevCounter) => prevCounter + 1);
    setcounter((prevCounter) => prevCounter + 1);
    setcounter((prevCounter) => prevCounter + 1);
    setcounter((prevCounter) => prevCounter + 1);
  }

  const subValue = () => {
    setcounter(counter - 1);
    if(counter <= 0) {
      setcounter(0);
    }
  }

  return (
    <div>
      <h1>React Course {counter} </h1>
      <h2>Counter Value : {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <button onClick={subValue}>Remove Value</button>
      <p>Footer : {counter}</p>
    </div>
  )
}


export default App;