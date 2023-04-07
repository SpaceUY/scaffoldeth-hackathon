import { useState } from "react";
import Image from "next/image";
// import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { IntegerInput } from "~~/components/scaffold-eth";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type marble = {
  name: string;
  id: number;
  img: any;
};
interface PlayersType {
  isStarting: boolean;
  marbles: marble[];
  selected: marble | undefined;
  setSelected: SetStateFunction<marble | undefined>;
}

export const MarbleRacePlayers = ({ marbles, selected, isStarting, setSelected }: PlayersType) => {
  const [valueBet, setValueBet] = useState<string | BigNumber>("");

  //   const { writeAsync } = useScaffoldContractWrite({
  //     contractName: "IntergalacticMarbleRace",
  //     functionName: "placeBet",
  //     args: [selected?.id, Ethers.BigNumber.from(valueBet)],
  //   });

  const handleChange = (newValue: string | BigNumber) => {
    setValueBet(newValue);
  };

  const handleBet = async () => {
    // await writeAsync();
  };

  return (
    <>
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
              alt={`${marble.id}`}
              className={`${selected?.id === marble.id ? "selected" : ""} ${isStarting ? "fade-out" : ""} marble`}
              onClick={() => setSelected(marble)}
            />
          ))}
        </div>
        <div
          className={`flex justify-center bg-base-100 items-center gap-12 flex-col sm:flex-row ${
            isStarting ? "fade-out" : ""
          }`}
          style={{ padding: "10px 0px" }}
        >
          <div className={`text-center`} style={{ width: "20%" }}>
            <IntegerInput name={"bet"} value={valueBet} placeholder={"your bet"} onChange={handleChange} />
          </div>
        </div>

        <div
          className={`flex justify-center bg-base-100 items-center gap-12 flex-col sm:flex-row ${
            isStarting ? "fade-out" : ""
          }`}
          style={{ padding: "10px 0px" }}
        >
          <div
            className="flex flex-col px-10 py-7 text-center items-center max-w-xs rounded-3xl"
            style={{
              backgroundColor:
                valueBet.toString().match(/^\d+(\.\d{1,4})?$/) !== null && selected ? "#f5222d" : "#8c8c8c",
              cursor: valueBet.toString().match(/^\d+(\.\d{1,4})?$/) !== null && selected ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (valueBet.toString().match(/^\d+(\.\d{1,4})?$/) !== null && selected) {
                handleBet();
              }
            }}
          >
            <span style={{ fontSize: "2.5em", color: "white" }}>
              <h1 className="block text-4xl font-bold" style={{ color: "white" }}>
                Bet
              </h1>
            </span>
          </div>
        </div>

        <div
          className={`flex justify-center items-center gap-12 flex-col sm:flex-row ${isStarting ? "fade-out" : ""}`}
          style={{ paddingTop: "5%" }}
        >
          <div className="flex flex-col px-10 py-10 text-center items-center rounded-3xl">
            <span style={{ fontSize: "3em", color: "white" }}>Waiting for an owner to start the race.</span>
          </div>
        </div>
      </div>
    </>
  );
};
