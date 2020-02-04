import React, { useEffect, useState } from 'react';

export function useClock(interval = 1000) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), interval);
        return () => clearInterval(timerID);
    })

    return date;
}

export default function Clock() {

    return (
        <div style={{margin:0,padding:0,display:'inline-block',fontSize:'30px',lineHeight:0}}>
            <p>{useClock().toLocaleTimeString('ch-CH', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
    )
}
