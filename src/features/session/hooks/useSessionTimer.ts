import { useState, useEffect } from "react";

export function useSessionTimer(expiresAt: string | undefined) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const expiryTime = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setIsExpired(true);
      } else {
        setTimeLeft(Math.floor(difference / 1000));
        setIsExpired(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return { timeLeft, formattedTime, isExpired };
}
