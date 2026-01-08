import { useState } from 'preact/hooks'
import './app.css'

export function App() {

  const [counter, setcounter] = useState(0); // counter : is a state variable , setcounter : is a function tht updates the state variable

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
    if (counter <= 0) {
      setcounter(0);
    }
  }

  const resetValue = () => {
    setcounter(0);
  }

  return (
    <div>
      <h2>Counter Value : {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <button onClick={subValue}>Remove Value</button>
      <button onClick={resetValue}>Reset Value</button>
      <p>Footer : {counter}</p>
    </div>
  )
}

export default App;