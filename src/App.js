import React, {useState, useRef} from 'react';
import './App.css';

function padTime(time){
  return time.toString().padStart(2,'0')
}


export default function App() {
  const [title, setTitle] = useState('let the countdown begin')
  const [timeLeft, setTimeLeft] = useState(25*60)
  const [isRunning, setIsRunning] = useState(false)
  const [isReset, setIsReset] = useState(false)
  console.log(timeLeft)
  const intervalRef = useRef(null)

  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - minutes * 60)
  console.log(minutes, seconds)

  function startTimer(){
    if(intervalRef.current !== null) return  
    setTitle(`You're doing great!`)
    setIsRunning(true)
    setIsReset(true)
    intervalRef.current = setInterval(() => {
     setTimeLeft((timeLeft) =>{
        if(timeLeft >= 1) return timeLeft - 1
        resetTimer()
        return 0
     }) 
   },1000)
 }
  
  function stopTimer(){
    if(intervalRef.current === null) return
    setIsRunning(false) 
    setTitle('Keep up the hard work!')
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
 
  function resetTimer(){
    clearInterval(intervalRef.current)
    setTimeLeft(25*60)
    setTitle('Ready to go another round!')
    setIsReset(false)
    setIsRunning(false)
    intervalRef.current = null
  }

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {isReset && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
