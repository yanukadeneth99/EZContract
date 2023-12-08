"use client";
declare const window: any;
import BackButton from "@/components/BackButton";
import { Button, Divider, Input, Switch, Link } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  defineChain,
} from "viem";

import Confetti from "@/components/Confetti";
import getContractName from "../../functions/GetERC20";

import { ERC20DataINT } from "../../interface/DataInterface";
import * as ERC20 from "../../data/ERC20.json" assert { type: "json" };

export default function Page() {
  // States to control toggles
  const [isMintSelected, setMintSelected] = useState<boolean>(false);
  const [isMintableSelected, setMintableSelected] = useState<boolean>(false);
  const [isBurnableSelected, setBurnableSelected] = useState<boolean>(false);
  const [isPausableSelected, setPausableSelected] = useState<boolean>(false);

  // States to hold values
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [premint, setPremint] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [symbolError, setSymbolError] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deployContractAddress, setDeployContractAddress] =
    useState<`0x${string}`>("0x");

  // Hooks
  const { address, isConnecting, isDisconnected } = useAccount();

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  async function submit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    // Check if name is empty
    if (name === "") {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError("");
    }

    // Check if symbol is empty
    if (symbol === "") {
      setSymbolError("Symbol cannot be empty");
      return;
    } else {
      setSymbolError("");
    }

    const data: ERC20DataINT = {
      name: name,
      symbol: symbol,
      premint: premint,
      premintselected: isMintSelected,
      mintable: isMintableSelected,
      burnable: isBurnableSelected,
      pausable: isPausableSelected,
    };

    setStatus("Reading data...");

    if (window.ethereum === undefined) {
      console.error("No Ethereum Wallet");
      return;
    }

    setStatus("Waiting account signing...");

    // Get the Signer Information
    // eslint-disable-next-line no-use-before-define
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const xrpsidechain = defineChain({
      id: 1440002,
      name: "XRPL EVM Sidechain",
      network: "XRPL EVM Sidechain",
      nativeCurrency: {
        decimals: 18,
        name: "XRPL EVM Sidechain",
        symbol: "XRP",
      },
      rpcUrls: {
        public: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
        default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
      },
      blockExplorers: {
        default: { name: "XRP Ledger", url: "https://evm-sidechain.xrpl.org" },
        etherscan: {
          name: "XRP Ledger",
          url: "https://evm-sidechain.xrpl.org",
        },
      },
      testnet: true,
    });

    // eslint-disable-next-line no-use-before-define
    const walletClient = createWalletClient({
      chain: xrpsidechain,
      transport: custom(window.ethereum),
    });

    const publicClient = createPublicClient({
      chain: xrpsidechain,
      transport: http(),
    });

    setLoading(true);
    setStatus("Deploying contract...");
    const conName = getContractName(data);

    const abi = ERC20[conName as keyof typeof ERC20][0] as readonly unknown[];
    const bytecode = ERC20[conName as keyof typeof ERC20][1] as `0x${string}`;
    const passedArgs = conName.toUpperCase().includes("PM")
      ? [account, name, symbol, parseInt(premint)]
      : [account, name, symbol];

    try {
      const hash = await walletClient.deployContract({
        abi,
        account,
        args: passedArgs,
        bytecode,
      });

      setStatus("Waiting for Transaction to complete...");

      await publicClient
        .waitForTransactionReceipt({
          hash: hash,
        })
        .then((res) => {
          console.log(res);
          setStatus("Deployed to: " + res.contractAddress);
          setDeployContractAddress(res.contractAddress as `0x${string}`);
          setLoading(false);
          setVisible(true);
          setName("");
          setSymbol("");
          setPremint("");
          setMintSelected(false);
          setMintableSelected(false);
          setBurnableSelected(false);
          setPausableSelected(false);
        });
    } catch (error) {
      console.error(error);
      setStatus("Error Occured! Please re-try");
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center py-12 space-y-12">
      {/* Header */}
      <div className="w-11/12 md:w-10/12 lg:w-3/4 flex flex-col lg:flex-row justify-center items-center space-y-2 lg:space-y-0 lg:space-x-6 p-3 backdrop-blur-md rounded-2xl">
        <BackButton />
        <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-mono text-gray-200 font-bold">
          Create your own Fungible Token
        </h1>
      </div>

      {/* Body */}
      <div className="w-11/12 md:w-10/12 lg:w-3/4 flex flex-col justify-start items-center p-3 backdrop-blur-md rounded-2xl backdrop-brightness-75 overflow-x-hidden overflow-y-scroll">
        {visible && <Confetti />}

        {/* Form */}
        <form className="flex flex-col justify-center items-center w-full p-3 space-y-12">
          {/* Name */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-col lg:flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-lg lg:text-xl text-center">
                Name:
              </div>
              <div className="basis-3/5 w-full">
                <Input
                  key="name_crypto"
                  type="text"
                  isRequired
                  label="Name"
                  placeholder="Bitcoin"
                  aria-label="Name"
                  className="font-mono"
                  value={name}
                  onValueChange={setName}
                  isInvalid={nameError !== ""}
                  color={nameError !== "" ? "danger" : "default"}
                  errorMessage={nameError !== "" && "Please enter a valid name"}
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-center lg:text-right w-full lg:w-4/6 lg:self-end font-mono">
              Enter the name you want to call your Cryptocurrency. This name
              will be what the Cryptocurrency will be called on the blockchain.
            </p>
          </div>

          {/* Symbol */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-col lg:flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-lg lg:text-xl text-center">
                Symbol:
              </div>
              <div className="basis-3/5 w-full">
                <Input
                  key="symbol_crypto"
                  isRequired
                  type="text"
                  label="Symbol"
                  placeholder="BTC"
                  aria-label="Symbol"
                  className="font-mono"
                  value={symbol}
                  onValueChange={setSymbol}
                  isInvalid={symbolError !== ""}
                  color={symbolError !== "" ? "danger" : "default"}
                  errorMessage={
                    symbolError !== "" && "Please enter a valid symbol"
                  }
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-center lg:text-right w-full lg:w-4/6 lg:self-end font-mono">
              This will be the Symbol of your Cryptocurrency used on the
              blockchain to identify your Cryptocurrency.
            </p>
          </div>

          {/* Pre Mint */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-col lg:flex-row justify-center items-center w-full">
              <div className="basis-1/5 flex justify-end items-center lg:pr-12">
                <Switch
                  aria-label="Enable Mint"
                  isSelected={isMintSelected}
                  onValueChange={setMintSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${
                  !isMintSelected ? "text-gray-100/40" : "text-gray-100"
                } font-mono text-lg lg:text-xl text-center`}
              >
                Pre Mint:
              </div>
              <div className="basis-3/5 w-full">
                <Input
                  key="mint_crypto"
                  type="number"
                  label={isMintSelected ? "Pre Mint" : "Pre Mint (Disabled)"}
                  disabled={!isMintSelected}
                  placeholder="5000"
                  className="font-mono"
                  aria-label="Mint"
                  value={premint}
                  onValueChange={setPremint}
                />
              </div>
            </div>
            <p
              className={`${
                !isMintSelected ? "text-gray-100/40" : "text-gray-100"
              } text-xs text-center lg:text-right w-full lg:w-4/6 lg:self-end font-mono`}
            >
              You can premint a set of tokens when deploying the contract. This
              will add tokens in your contract in your name. It&apos;s important
              to make sure that you either have pre-minted tokens or you have a
              mint function in your contract.
            </p>
          </div>

          <Divider className="my-4 bg-gray-400/60" />

          {/* Choices */}
          <div className="flex flex-col lg:flex-row w-full space-y-12 lg:space-y-0 lg:space-x-2">
            {/* Mintable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/3">
              <Switch
                defaultSelected={false}
                isSelected={isMintableSelected}
                onValueChange={setMintableSelected}
              >
                <p
                  className={`${
                    isMintableSelected ? "text-gray-100" : "text-gray-100/40"
                  }  font-mono text-xl`}
                >
                  Mintable
                </p>
              </Switch>
              <p
                className={`${
                  isMintableSelected ? "text-gray-300" : "text-gray-300/40"
                }  font-mono text-sm text-center`}
              >
                If enabled, this allows you, the person who deploys, to have the
                ability to mint more tokens.
              </p>
            </div>

            {/* Burnable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/3">
              <Switch
                defaultSelected={false}
                isSelected={isBurnableSelected}
                onValueChange={setBurnableSelected}
              >
                <p
                  className={`${
                    isBurnableSelected ? "text-gray-100" : "text-gray-100/40"
                  }  font-mono text-xl`}
                >
                  Burnable
                </p>
              </Switch>
              <p
                className={`${
                  isBurnableSelected ? "text-gray-300" : "text-gray-300/40"
                }  font-mono text-sm text-center`}
              >
                If enabled, this allows anyone who owns token to Burn Tokens.
                Burning tokens is a way to remove tokens from circulation by
                transferring them to a dead address.
              </p>
            </div>

            {/* Pausable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/3">
              <Switch
                defaultSelected
                isSelected={isPausableSelected}
                onValueChange={setPausableSelected}
              >
                <p
                  className={`${
                    isPausableSelected ? "text-gray-100" : "text-gray-100/40"
                  }  font-mono text-xl`}
                >
                  Pausable
                </p>
              </Switch>
              <p
                className={`${
                  isPausableSelected ? "text-gray-300" : "text-gray-300/40"
                }  font-mono text-sm text-center`}
              >
                If enabled, this allows you, the person who deploys, to have the
                ability to pause main transactions of the contract. This is
                useful if you want to stop all transactions in case of a bug or
                a hack.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            {/* Wallet not Connected */}
            {isDisconnected && <ConnectButton />}

            {/* Connection ongoing */}
            {isConnecting && <p>Connecting, please check your wallet...</p>}

            {/* Connected */}
            {address && (
              <>
                <Button
                  type="submit"
                  onClick={(e) => submit(e)}
                  size="lg"
                  isLoading={loading}
                  color="primary"
                  variant="shadow"
                  className="uppercase font-mono"
                >
                  Submit
                </Button>
                <p className="font-mono text-gray-200 uppercase text-xs md:text-md">
                  {status.toUpperCase().includes("DEPLOYED") ? (
                    <Link
                      target="_blank"
                      href={`https://evm-sidechain.xrpl.org/address/${deployContractAddress}`}
                    >
                      {status}
                    </Link>
                  ) : (
                    status
                  )}
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
