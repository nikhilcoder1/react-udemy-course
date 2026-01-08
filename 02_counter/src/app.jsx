import { useState } from 'preact/hooks'
import './app.css'

export function App() {

  const [counter, setCounter] = useState(0); // counter : is a state variable , setcounter : is a function tht updates the state variable

  // let counter = 10;

  const addValue = () => {
    // to prevent batching in react using previousCounter    
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
  }

  const subValue = () => {
    setCounter(counter - 1);
    if (counter <= 0) {
      setCounter(0);
    }
  }

  const resetValue = () => {
    setCounter(0);
  }

  return (
  <div className="app">
    <div className="counter-card">
      <h2>Counter App</h2>

      <div className="counter-value">{counter}</div>

      <div className="buttons">
        <button className="add" onClick={addValue}>+ Add</button>
        <button className="remove" onClick={subValue}>− Remove</button>
        <button className="reset" onClick={resetValue}>Reset</button>
      </div>

      <p className="footer">State-driven UI</p>
    </div>
  </div>
);

}

export default App;