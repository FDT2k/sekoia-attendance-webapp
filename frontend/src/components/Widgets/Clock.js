import React, { useEffect, useState } from 'react';
import moment from 'moment';

import 'moment/locale/fr';


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
        <div style={{margin:0,padding:0,display:'inline-block',fontSize:'30px',lineHeight:'100%',height:'100%', fontWeight:'bold'}}>
            {moment(useClock()).format('HH:mm')}
        </div>
    )
}
