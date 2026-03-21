import { useState, useEffect} from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState(15)

  const addValue = () => {
    setCount(count + 1)
    console.log(count)
  }

  const removeValue = () => {
    setCount(count - 1)
    console.log(count)
  }

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {count}</h2>


      <button
      onClick={addValue}>Add Value {count}</button>
      <br />
      <button
      onClick={removeValue}>Remove Value {count}</button>
      <p>footer: {count}</p>
    </>
  )
}

export default App
