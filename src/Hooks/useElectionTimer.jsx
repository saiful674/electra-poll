import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useElectionTimer = (date) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [timeDifference, setTimeDifference] = useState()
    useEffect(() => {
        if (date) {

            function calculateTimeLeft() {
                const now = new Date();

                // Convert the provided endDate into a timestamp for easier calculations
                const endTime = new Date(date).getTime();

                // Convert now to UTC
                const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));

                const difference = endTime - nowUTC;
                setTimeDifference(difference)

                if (difference <= 0) {
                    clearInterval(intervalId)
                    setTimeLeft(false)
                }
                else {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    const seconds = Math.floor((difference / 1000) % 60);

                    setTimeLeft(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`)
                }

            }
            const intervalId = setInterval(() => {
                calculateTimeLeft()
            }, 1000);
            setIntervalId(intervalId)
            calculateTimeLeft()

            return () => clearInterval(intervalId);
        }
    }, [date]);

    return { timeLeft, timeDifference }
};

export default useElectionTimer;