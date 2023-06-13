import React , { useEffect, useState } from "react";

type useIntervalType = {
    seconds : number;
}

export const useInterval = (second : number, func : ()=>any, isCallInit ?: boolean): useIntervalType =>{
    const [seconds, setSeconds] = useState<number>(0);
    useEffect(() => {
        if(isCallInit) func();
        const interval = setInterval(()=>{
            setSeconds(seconds=> seconds + 1);
            func();
        }, second * 1000);
        return ()=> clearInterval(interval);
    }, []);

    return { seconds };
}