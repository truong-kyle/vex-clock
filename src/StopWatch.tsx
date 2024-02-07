import React, {useState, useCallback, useEffect} from 'react'
import StopWatchButton from './StopWatchButton'
import { formatTime } from './FormatTime'
import './StopWatch.css'

var prevTime: number = 0

export default function StopWatch() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    const handleReset = useCallback(() => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
        prevTime = 0
    }, [])

    useEffect( () => {
        let intervalId: NodeJS.Timeout
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime+1)
            }, 10)
        }
        return () => clearInterval(intervalId)
    } , [isRunning]
    )

    const addLap = (time: number) => {
        const toAdd: number = time - prevTime
        setLaps([...laps, toAdd])
        prevTime = time
    }

        return(
            <div className = "clock-container">
                <h1>Stopwatch</h1>
                <div className = "clock-display">
                    <p>{formatTime(time)}</p>
                </div>
                <div className = "button-row">
                    <StopWatchButton type = "start" onClick={() => setIsRunning(true)} disabled = {isRunning}/>
                    <StopWatchButton type = "stop" onClick={() => setIsRunning(false)} disabled = {!isRunning} />
                    <StopWatchButton type = "lap" onClick={() => addLap(time)} disabled = {!isRunning} />
                    <StopWatchButton type = "reset" onClick={handleReset} />
                </div>
                {
                    laps.length > 0 && (
                        <div className='lap-times'>
                            <h2>Lap Times</h2>
                            <ul>
                                {laps.map((lap, index) => (<li key={index}>Lap {index+1}: {formatTime(lap)}</li>))}
                            </ul>
                            </div>
                    )
                }
            </div>
        )
    }
