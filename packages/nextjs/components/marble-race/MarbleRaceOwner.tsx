import { ButtonStartRace } from "~~/components/marble-race";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;
interface OwnerType {
  isStarting: boolean;
  isPrepared: boolean;
  startingTime: number;
  // setIsStarting: SetStateFunction<boolean>;
  setIsPrepared: SetStateFunction<boolean>;
}

export const MarbleRaceOwner = ({ isPrepared, startingTime, isStarting, setIsPrepared }: OwnerType) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "IntergalacticMarbleRace",
    functionName: "sponsorRace", //prepareRace sponsorRace
    args: undefined,
  });

  const startRace = async () => {
    await writeAsync();
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow w-full mt-16 py-12 justify-center items-center">
          <div
            className={`flex justify-center items-center gap-12 flex-col sm:flex-row ${isStarting ? "fade-out" : ""}`}
            style={{ paddingTop: "5%" }}
          >
            <ButtonStartRace
              startRace={startRace}
              isPrepared={isPrepared}
              startingTime={startingTime}
              setIsPrepared={setIsPrepared}
            />
          </div>
        </div>
      </div>
    </>
  );
};
