import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    initialTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
    const parseTime = (timeString: string): Time => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return { hours, minutes, seconds };
    };

    const [time, setTime] = useState<Time>(parseTime(initialTime));
    const navigate = useNavigate();
    let intervalId: NodeJS.Timeout;


    const subtractOneSecond = (currentTime: Time): Time => {
        const { hours, minutes, seconds } = currentTime;
        if (hours === 0 && minutes === 0 && seconds === 0) {
            // Timer reached zero
            clearInterval(intervalId);
            alert("Thời gian làm bài đã hết !")
            navigate(-1);
        }

        const newSeconds = seconds === 0 ? 59 : seconds - 1;
        const newMinutes = seconds === 0 ? minutes - 1 : minutes;
        const newHours = minutes === 0 && seconds === 0 ? hours - 1 : hours;

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
    };

    useEffect(() => {
        intervalId = setInterval(() => {
            setTime((prevTime) => {
                return subtractOneSecond(prevTime);
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>
                {String(time.hours).padStart(2, '0')}:
                {String(time.minutes).padStart(2, '0')}:
                {String(time.seconds).padStart(2, '0')}
            </p>
        </div>
    );
};

export default CountdownTimer;