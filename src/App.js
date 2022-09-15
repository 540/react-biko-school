import { useState } from 'react'

export const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Button onClick={() => setCounter(prevState => ++prevState)} label="+1" />
      <CounterDisplay counter={counter} />
      <Button onClick={() => setCounter(prevState => --prevState)} label="-1" />
    </div>
  )
}

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}

const CounterDisplay = ({ counter }) => {
  return <p>{counter}</p>
}


