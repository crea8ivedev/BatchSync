import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const Timer = ({ startTime, status, className = "", elapsedSeconds }) => {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    if (status === "Paused" && elapsedSeconds !== undefined) {
      setElapsedTime(formatDuration(elapsedSeconds));
      return;
    }

    if (!startTime || status !== "In Process") {
      return;
    }

    const updateTimer = () => {
      try {
        const elapsed = differenceInSeconds(new Date(), new Date(startTime));
        setElapsedTime(formatDuration(elapsed));
      } catch (error) {
        console.error("Error calculating elapsed time:", error);
        setElapsedTime("00:00:00");
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, status, elapsedSeconds]);

  if (!startTime && elapsedSeconds === undefined) {
    return null;
  }

  if (status === "In Process" || status === "Paused") {
    return <span className={className}>{elapsedTime}</span>;
  }

  return null;
};

export default Timer;
