'use client';

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phases = parseInt(searchParams.get("phases") || "3", 10);
    const minutes = parseInt(searchParams.get("minutes") || "25", 10);
    const restMinutes = parseInt(searchParams.get("restmins") || "5", 10);

    const initialTime = minutes * 60;
    const restTime = restMinutes * 60;
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isRestTime, setIsRestTime] = useState(false);
    const [restTimer, setRestTimer] = useState(restTime);
    const [phase, setPhase] = useState(1);
    const [soundPlayed, setSoundPlayed] = useState(false)

    const playSound = () => {
        const audio = new Audio("/sound/notification.wav");
        audio.play();
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning && !isRestTime && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (isRestTime && restTimer > 0) {
            interval = setInterval(() => {
                setRestTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, time, isRestTime, restTimer]);

    useEffect(() => {
        if (time === 0 && !soundPlayed) {
            setIsRunning(false);
            setIsRestTime(true);
            playSound();
            setSoundPlayed(true);
        }
        if (restTimer === 0) {
            setRestTimer(restTime);
            setIsRestTime(false);
            setTime(initialTime);
            setPhase((prev) => prev + 1);
            playSound();
            setSoundPlayed(false);
        }
    }, [time, restTimer]);

    const toggleTimer = () => {
        if (isRestTime) {
            setTime(initialTime);
            setRestTimer(restTime);
            setIsRestTime(false);
        }
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(initialTime);
        setRestTimer(restTime);
        setIsRestTime(false);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            {phase > phases ? (
                <>
                    <h1 className="text-5xl font-bold">Session has finished!</h1>
                    <Button onClick={() => (window.location.href = "/")}>Reset</Button>
                </>
            ) : (
                <>
                    {isRestTime ? (
                        <h1 className="text-3xl font-bold">
                            Rest Time: {Math.floor(restTimer / 60)}:{String(restTimer % 60).padStart(2, "0")}
                        </h1>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold">
                                Phase {phase} out of {phases}
                            </h1>
                            <h1 className="text-6xl font-bold">
                                {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
                            </h1>
                            <div className="space-x-4">
                                <Button onClick={toggleTimer}>
                                    {isRunning ? "Pause" : "Start"}
                                </Button>
                                <Button onClick={resetTimer}>Reset</Button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
