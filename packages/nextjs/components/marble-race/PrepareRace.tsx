import React, { useEffect } from "react";
import Head from "next/head";
import Modal from "~~/components/Modal";
import { LastRaces } from "~~/components/marble-race";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useModal } from "~~/hooks/scaffold-eth";

interface Props {
  isOwner: boolean;
}
export const PrepareRace = ({ isOwner }: Props) => {
  console.log("isOwner: ", isOwner);
  const { isOpen, toggle } = useModal();
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "IntergalacticMarbleRace",
    functionName: "prepareRace", //prepareRace sponsorRace
    args: undefined,
  });

  const startRace = async () => {
    const res = await writeAsync();
    console.log({ res });
  };

  useEffect(() => {
    console.log("entre al comp");
  }, []);

  return (
    <>
      <Head>
        <title>Marble Race</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="w-full">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Marble Race</span>
          </h1>
          <div
            style={{
              backgroundImage: `url(/assets/main.png)`,
              width: "100%",
              height: "400px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8,
            }}
          ></div>
        </div>
        <div className="flex-grow w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            {isOwner ? (
              <div
                onClick={() => startRace()}
                className="flex flex-col px-10 py-10 text-center items-center max-w-xs rounded-3xl"
                style={{ backgroundColor: "#f5222d", cursor: "pointer" }}
              >
                <span style={{ fontSize: "3em", color: "white" }}>Start game</span>
              </div>
            ) : (
              <div className="flex flex-col px-10 py-10 text-center items-center rounded-3xl">
                <span style={{ fontSize: "3em", color: "white" }}>Waiting for an owner to prepare the race.</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ cursor: "pointer" }} onClick={toggle}>
          <h1 className="text-center mb-8">
            <span className="block text-3xl font-bold">Last Races</span>
          </h1>
        </div>
        <Modal isOpen={isOpen} toggle={toggle} width={"50%"} height={"90%"}>
          <LastRaces />
        </Modal>
      </div>
    </>
  );
};
