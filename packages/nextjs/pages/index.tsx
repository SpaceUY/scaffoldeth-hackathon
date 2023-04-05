// import Head from "next/head";
// import Link from "next/link";
// import type { NextPage } from "next";
// import Image from 'next/image';
// import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
// const Home: NextPage = () => {
//   return (
//     <>
//       <Head>
//         <title>Marble Race</title>
//         <meta name="description" content="Created with 🏗 scaffold-eth" />
//       </Head>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="w-full">
//           <h1 className="text-center mb-8">
//             <span className="block text-4xl font-bold">Marble Race</span>
//           </h1>
//           <div style={{backgroundImage: `url(/assets/main.png)`, width: "100%", height: "400px", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.8}}></div>
//         </div>
//         <div className="flex-grow w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//           <Link
//             href={"/game"}
//             className={`hover:bg-secondary hover:shadow-md focus:bg-secondary py-1.5 px-3 text-sm rounded-full gap-2`}
//           >
//             <div className="flex flex-col px-10 py-10 text-center items-center max-w-xs rounded-3xl" style={{backgroundColor: "#f5222d", cursor:"pointer"}}>
//               <span style={{fontSize:"3em", color:"white"}}>Start game</span>
//             </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">scaffold-eth 2</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/nextjs/pages/index.tsx</code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract <code className="italic bg-base-300 text-base font-bold">YourContract.sol</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/hardhat/contracts</code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
