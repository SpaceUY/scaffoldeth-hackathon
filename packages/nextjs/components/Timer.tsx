import { useEffect, useState } from "react";

interface Props {
  startingTime: number;
  colorText: string;
}

function Timer({ startingTime, colorText }: Props) {
  const [time, setTime] = useState<number>(startingTime);

  useEffect(() => {
    const tick = () => {
      setTime(time - 1);
    };
    if (time > -1) {
      setTimeout(() => requestAnimationFrame(tick), 1000);
    }
  }, [time]);

  return (
    <div>
      <h1 className="block text-4xl font-bold" style={{ color: colorText }}>
        {time > -1 ? time : "Start"}
      </h1>
    </div>
  );
}

export default Timer;
