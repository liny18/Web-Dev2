import { useEffect, useState, useContext } from 'react';
import { TimerContext } from '../App'

export const Timer = ( props ) => {
  const { secondsLeft, setSecondsLeft, setEnd } = useContext(TimerContext);
  const { name } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        setEnd(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
      <div className="timer">
        <h2 className='text-xl'>Countdown: { secondsLeft }</h2>
        <p>Player: { name }</p>
      </div>
  )
}