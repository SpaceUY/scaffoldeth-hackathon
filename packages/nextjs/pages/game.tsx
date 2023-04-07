// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import Modal from "~~/components/Modal";
import { MarbleRaceOwner, MarbleRacePlayers, PrepareRace } from "~~/components/marble-race";
import { useAccountInfo, useModal, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { marbles } from "~~/utils/marble-race";

type marble = {
  name: string;
  id: number;
  img: any;
};

const Game: NextPage = () => {
  const [selected, setSelected] = useState<marble>();
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [startingTime, setStartingTime] = useState<number>(-2);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isPrepared, setIsPrepared] = useState<boolean>(false);
  const [winner, setWinner] = useState<marble>();
  const { account } = useAccountInfo();
  const { isOpen, toggle } = useModal();

  const { data: currentRace } = useScaffoldContractRead({
    contractName: "IntergalacticMarbleRace",
    functionName: "currentRace",
  });

  useScaffoldEventSubscriber({
    contractName: "IntergalacticMarbleRace",
    eventName: "RaceSponsorStarted",
    listener: () => {
      setIsStarting(true);
    },
  });

  useScaffoldEventSubscriber({
    contractName: "IntergalacticMarbleRace",
    eventName: "RaceSponsored",
    listener: (raceId, raceEndTime, scores, winner) => {
      setTimeout(() => {
        console.log("winner: ", winner);
        setWinner(marbles.find(marble => marble.id === parseInt(winner._hex, 16)));
        toggle();
      }, 60000);
    },
  });

  useScaffoldEventSubscriber({
    contractName: "IntergalacticMarbleRace",
    eventName: "RacePrepared",
    listener: (raceId, prepEndTime) => {
      console.log("prepEndTime: ", prepEndTime);
      console.log("raceId: ", raceId);
      setIsReady(true);
    },
  });

  useEffect(() => {
    console.log("account: ", account);
    console.log("game isOwner: ", isOwner);
    if (account.address && account.isOwner) {
      setIsOwner(account.isOwner);
    } else setIsOwner(false);
  }, [account, isOwner]);

  useEffect(() => {
    console.log("currentRace: ", currentRace);
    if (currentRace && currentRace.endTime.toNumber() * 1000 !== 0) {
      !currentRace?.isCompleted ? setIsReady(true) : null;
      const endTime = new Date(currentRace.endTime.toNumber() * 1000);
      if (endTime > Date.now()) {
        console.log("prep time ending in:", Math.ceil((endTime - Date.now()) / 1000));
        setStartingTime(Math.ceil((endTime - Date.now()) / 1000));
      } else setStartingTime(-1);
    } else {
      setIsReady(false);
    }
  }, [currentRace]);

  const finishRace = async () => {
    try {
      toggle();
      setIsStarting(false);
      setIsReady(false);
      setWinner(undefined);
      setStartingTime(-2);
      setSelected(undefined);
      setIsPrepared(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (!isReady) {
    return <PrepareRace isOwner={isOwner} />;
  }

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
        {isOwner ? (
          <MarbleRaceOwner
            isPrepared={isPrepared}
            isStarting={isStarting}
            setIsPrepared={setIsPrepared}
            setIsStarting={setIsStarting}
            startingTime={startingTime}
          />
        ) : (
          <MarbleRacePlayers isStarting={isStarting} marbles={marbles} selected={selected} setSelected={setSelected} />
        )}
        <div className="flex-grow w-full mt-16 py-12 justify-center items-center">
          {isStarting &&
            marbles.map((marble, index) => (
              <div key={index} className={`${winner && `fade-out`}`}>
                <Image src={marble.img} alt={`${marble.id}`} className={`marble marble-move-${index}-fade-in `} />
              </div>
            ))}

          <Modal isOpen={isOpen} toggle={finishRace} height="50%" width="50%">
            <h1 className="text-center mt-6">
              <span className="block text-4xl font-bold">WINNER!</span>
            </h1>

            <div className="flex items-center flex-col flex-grow pt-10">
              <span className="block text-2xl font-bold">Marble number: {winner?.id}</span>
              <div className="flex justify-center items-center gap-12 flex-col sm:flex-row py-8">
                <Image src={winner?.img} alt="green-ball" className={`marble`} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Game;
