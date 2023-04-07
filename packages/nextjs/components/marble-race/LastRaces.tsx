import React from "react";
import Image from "next/image";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { marbles } from "~~/utils/marble-race";

export const LastRaces = () => {
  const { data: last10Races } = useScaffoldContractRead({
    contractName: "IntergalacticMarbleRace",
    functionName: "getLast10Races",
  });

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
            <th scope="col"></th>
            <th scope="col">Marble name</th>
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
                  <td data-label="Number">{marble?.name}</td>
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
