import React, { useEffect } from "react";
import Head from "next/head";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  setIsReady: SetStateFunction<boolean>;
}
const PrepareRace = ({ setIsReady }: Props) => {
  // eslint-disable-next-line no-use-before-define
  const { writeAsync, data } = useScaffoldContractWrite({
    contractName: "IntergalacticMarbleRace",
    functionName: "prepareRace", //prepareRace sponsorRace
    args: undefined,
  });
  const startRace = async () => {
    const res = await writeAsync();
    setIsReady(true);
    console.log("res: ", data);
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
            <span className="block text-4xl font-bold">Marble Race2</span>
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
            <div
              onClick={() => startRace()}
              className="flex flex-col px-10 py-10 text-center items-center max-w-xs rounded-3xl"
              style={{ backgroundColor: "#f5222d", cursor: "pointer" }}
            >
              <span style={{ fontSize: "3em", color: "white" }}>Start game</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrepareRace;
