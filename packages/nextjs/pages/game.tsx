import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import marble2 from "../public/assets/blueball.png";
import marble1 from "../public/assets/greenball.png";
import marble3 from "../public/assets/violetball.png";
import marble4 from "../public/assets/whiteball.png";
import type { NextPage } from "next";
import Timer from "~~/components/Timer";

type marble = {
  name: string;
  id: number;
};

const Game: NextPage = () => {
  const [selected, setSelected] = useState<marble>();
  const [isStarting, setIsStarting] = useState<boolean>();
  const marbles = [
    {
      id: 1,
      name: "Green",
      img: marble1,
    },
    {
      id: 2,
      name: "Green",
      img: marble2,
    },
    {
      id: 3,
      name: "Green",
      img: marble3,
    },
    {
      id: 4,
      name: "Green",
      img: marble4,
    },
    {
      id: 5,
      name: "Green",
      img: marble1,
    },
    {
      id: 6,
      name: "Green",
      img: marble2,
    },
    {
      id: 7,
      name: "Green",
      img: marble3,
    },
    {
      id: 8,
      name: "Green",
      img: marble4,
    },
    {
      id: 9,
      name: "Green",
      img: marble1,
    },
    {
      id: 10,
      name: "Green",
      img: marble2,
    },
  ];
  return (
    <>
      <Head>
        <title>Marble Race</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="w-full">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Game</span>
          </h1>
        </div>
        <div className="flex-grow w-full mt-16 py-12 justify-center items-center">
          <h1 className={`text-center mb-8 ${isStarting ? "fade-out" : ""}`}>
            <span className="block text-2xl font-bold">Select your marble</span>
          </h1>
          <div
            className={`flex justify-center bg-base-100 items-center gap-12 flex-col sm:flex-row ${
              isStarting ? "fade-out" : ""
            }`}
            style={{ padding: "10px 0px" }}
          >
            {marbles.map((marble, index) => (
              <Image
                key={index}
                src={marble.img}
                alt="green-ball"
                className={`${selected?.id === marble.id ? "selected" : ""} ${isStarting ? "fade-out" : ""} marble`}
                onClick={() => setSelected(marble)}
              />
            ))}
          </div>

          {isStarting &&
            marbles.map((marble, index) => (
              <Image key={index} src={marble.img} alt="green-ball" className={`marble  marble-move-${index} fade-in`} />
            ))}

          {isStarting && (
            <div className="flex flex-col text-center items-center">
              <Timer />
            </div>
          )}

          <div
            className={`flex justify-center items-center gap-12 flex-col sm:flex-row ${isStarting ? "fade-out" : ""}`}
            style={{ paddingTop: "5%" }}
          >
            <div
              className="flex flex-col px-10 py-7 text-center items-center max-w-xs rounded-3xl"
              style={{
                backgroundColor: selected ? "#f5222d" : "#8c8c8c",
                cursor: selected ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                if (selected) setIsStarting(true);
              }}
            >
              <span style={{ fontSize: "2.5em", color: "white" }}>Start</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
