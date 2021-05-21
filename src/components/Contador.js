import React, { useState, useRef, useEffect } from 'react'

export default function Contador(props) {
    const [timerDays, setTimerDays] = useState('0');
    const [timerHours, setTimerHours] = useState('0');
    const [timerMinutes, setTimerMinutes] = useState('0');
    const [timerSeconds, setTimerSeconds] = useState('0');

    function transformHour(hourUTC) {
        var date = new Date(hourUTC);
    
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
    
        var formattedDate = dd + "/" + mm + "/" + yyyy;
    
        var hh = date.getHours() + 3;
        var min = date.getMinutes();
        if (hh < 10) {
          hh = "0" + hh;
        }
        if (min < 10) {
          min = "0" + min;
        }
    
        var formattedHour = hh + ":" + min;
    
        return formattedDate + " " + formattedHour;
      }

      function makeMeTwoDigits(n){
        return (n < 10 ? "0" : "") + n;
    }

    let interval = useRef()

    const startTimer = () => {
        const countdownDate = new Date(props.final)
        countdownDate.setMinutes(
            countdownDate.getMinutes() + countdownDate.getTimezoneOffset())

            interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate.getTime() - now

                const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
                const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
                const seconds = Math.floor(distance % (1000 * 60 ) / 1000)

                if (distance < 0) {
                    clearInterval(interval.current)
                } else {
                    setTimerDays(days)
                    setTimerHours(hours)    
                    setTimerMinutes(minutes)
                    setTimerSeconds(seconds)
                }

            }, 1000)
    }

    const agora = new Date().getTime();
    const partida = new Date(props.final)
    partida.setMinutes(
        partida.getMinutes() + partida.getTimezoneOffset())
    
    const dif = partida.getTime() - agora

    useEffect(() => {
        startTimer()
        return() => {
            clearInterval(interval.current)
        }
    })

    return (
        // menos de 6h
        // (dif < 21600000) ? 
        //menos de 24h
        (dif < 86400000) ? 

            (<p>A partida começa em: {makeMeTwoDigits(timerHours)}:{makeMeTwoDigits(timerMinutes)}:{makeMeTwoDigits(timerSeconds)}</p>)
            :
            (transformHour(props.final))
        
    )
}