import { useScaffoldContractRead } from "./useScaffoldContractRead";
import { useAccount } from "wagmi";

export function useAccountInfo() {
  const { address } = useAccount();

  const { data: owner } = useScaffoldContractRead({
    contractName: "IntergalacticMarbleRace",
    functionName: "owner",
  });

  const account = {
    address,
    isOwner: address === owner,
  };

  return { account };
}
