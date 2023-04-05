import { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState<number>(3);

  useEffect(() => {
    const tick = () => {
      setTime(time - 1);
    };
    if (time > 0) {
      setTimeout(() => requestAnimationFrame(tick), 1000);
    }
  }, [time]);

  return (
    <div>
      <h1 className="block text-4xl font-bold" style={{ color: "#f5222d" }}>
        {time}
      </h1>
    </div>
  );
}

export default Timer;
