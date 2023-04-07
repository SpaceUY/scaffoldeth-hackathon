import React, { useEffect } from "react";
import Image from "next/image";
import marble2 from "../../public/assets/blueball.png";
import marble1 from "../../public/assets/greenball.png";
import marble3 from "../../public/assets/violetball.png";
import marble4 from "../../public/assets/whiteball.png";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const LastRaces = () => {
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
  const { data: last10Races } = useScaffoldContractRead({
    contractName: "IntergalacticMarbleRace",
    functionName: "getLast10Races",
  });

  useEffect(() => {
    console.log("last10Races: ", last10Races);
  }, [last10Races]);

  return (
    <>
      <table>
        <caption>
          <h1 className="text-center mb-8">
            <span className="block text-3xl font-bold">Last Races</span>
          </h1>
        </caption>
        <thead>
          <tr>
            <th scope="col">Marble img</th>
            <th scope="col">Marble number</th>
            <th scope="col">Total bets</th>
          </tr>
        </thead>
        <tbody>
          {last10Races?.map((race, index) => {
            const idMarble = parseInt(race.winningMarbleId._hex, 16);
            const marble = marbles.find(marble => marble.id === idMarble);
            if (marble) {
              return (
                <tr key={index}>
                  <td data-label="Img">
                    {marble ? (
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Image
                          key={index}
                          src={marble.img}
                          alt={`${marble.id}`}
                          className={`marble`}
                          style={{ display: "flex" }}
                        />{" "}
                      </div>
                    ) : (
                      "Without image"
                    )}
                  </td>
                  <td data-label="Number">{marble?.id}</td>
                  <td data-label="Bet">{race.totalBets.toNumber()}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};
