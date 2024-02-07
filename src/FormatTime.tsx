import React from 'react'

export function formatTime(time: number): string{
    const hours = Math.floor(time/360000)
    const mins = Math.floor((time %360000)/6000)
    const secs = Math.floor((time % 6000)/100)
    const milli = time % 100

    const formatHours = hours.toString().padStart(2, '0')
    const formatMins = mins.toString().padStart(2, '0')
    const formatSecs = secs.toString().padStart(2, '0')
    const formatMs = milli.toString().padStart(2, '0')

    return `${formatHours}:${formatMins}:${formatSecs}.${formatMs}`
}