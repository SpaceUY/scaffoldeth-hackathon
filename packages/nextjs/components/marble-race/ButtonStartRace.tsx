import React from "react";
import Timer from "~~/components/Timer";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface ButtonType {
  startingTime: number;
  isPrepared: boolean;
  setIsPrepared: SetStateFunction<boolean>;
  startRace: () => void;
}

export const ButtonStartRace = ({ isPrepared, startingTime, setIsPrepared, startRace }: ButtonType) => {
  return (
    <>
      <div
        className="flex flex-col px-10 py-7 text-center items-center max-w-xs rounded-3xl"
        style={{
          backgroundColor: isPrepared ? "#f5222d" : "#8c8c8c",
          cursor: isPrepared ? "pointer" : "not-allowed",
        }}
        onClick={() => {
          if (isPrepared) startRace();
        }}
      >
        <span style={{ fontSize: "2.5em", color: "white" }}>
          <h1 className="block text-4xl font-bold" style={{ color: "white" }}>
            <Timer startingTime={startingTime} colorText="white" setIsFinish={setIsPrepared} />
          </h1>
        </span>
      </div>
    </>
  );
};
