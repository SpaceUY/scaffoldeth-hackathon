import { useEffect, useState } from "react";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  setIsFinish: SetStateFunction<boolean>;
  startingTime: number;
  colorText: string;
}

function Timer({ startingTime, colorText, setIsFinish }: Props) {
  console.log("startingTime: ", startingTime);
  const [time, setTime] = useState<number>(startingTime);
  console.log("-time: ", time);

  useEffect(() => {
    console.log("time: ", time);
    const tick = () => {
      setTime(time - 1);
    };
    switch (time) {
      case -1:
        setIsFinish(true);
        break;
      case -2:
        setTime(startingTime);
        break;
      default:
        setTimeout(() => requestAnimationFrame(tick), 1000);
        break;
    }
  }, [time, startingTime, setIsFinish]);

  return (
    <div>
      <h1 className="block text-4xl font-bold" style={{ color: colorText }}>
        {time > -1 ? time : "Start"}
      </h1>
    </div>
  );
}

export default Timer;
