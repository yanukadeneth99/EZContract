"use client";
declare const window: any;
import BackButton from "@/components/BackButton";
import { Button, Divider, Input, Switch, Link } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import Confetti from "@/components/Confetti";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

import { ERC721DataINT } from "../../interface/DataInterface";
import * as ERC721 from "../../data/ERC721.json" assert { type: "json" };
import getContractName from "../../functions/GetERC721";

export default function Page() {
  // States to control toggles
  const [isPremintSelected, setPremintSelected] = useState<boolean>(false);
  const [isWhiteListSelected, setWhiteListSelected] = useState<boolean>(false);
  const [isMaxMintSelected, setMaxMintSelected] = useState<boolean>(false);
  const [isURISelected, setURISelected] = useState<boolean>(false);

  // States to Hold Data
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [baseURI, setBaseURI] = useState<string>("");
  const [publicPrice, setPublicPrice] = useState<string>("");
  const [maxTokens, setMaxTokens] = useState<string>("");
  const [whitelistText, setWhitelistText] = useState<string>("");
  const [whitelist, setWhitelist] = useState<`0x${string}`[]>([]);
  const [whitelistPrice, setWhitelistPrice] = useState<string>("");
  const [premint, setPremint] = useState<string>("");

  // States to Hold Errors
  const [nameError, setNameError] = useState<string>("");
  const [symbolError, setSymbolError] = useState<string>("");
  const [baseURIError, setBaseURIError] = useState<string>("");
  const [publicPriceError, setPublicPriceError] = useState<string>("");

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [deployContractAddress, setDeployContractAddress] =
    useState<`0x${string}`>("0x");

  // Hooks
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Regex Test for Whitelist Address
  const validateEmail = (value: string) => value.match(/^0x[a-fA-F0-9]{40}$/gm);

  const isInvalid = useMemo(() => {
    if (whitelistText === "") return false;

    return validateEmail(whitelistText) ? false : true;
  }, [whitelistText]);

  function addWhitelist() {
    if (isInvalid) return;
    if (whitelistText === "") return;
    setWhitelist([...whitelist, whitelistText as `0x${string}`]);
    setWhitelistText("");
  }

  function deleteWhitelist(index: number) {
    const newWhitelist = whitelist.filter((_, i) => i !== index);
    setWhitelist(newWhitelist);
  }

  // Submit Function
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

    // Check if baseURI is empty
    if (baseURI === "") {
      setBaseURIError("Base URI cannot be empty");
      return;
    } else {
      setBaseURIError("");
    }

    // Check if publicPrice is empty
    if (publicPrice === "") {
      setPublicPriceError("Public Price cannot be empty");
      return;
    } else {
      setPublicPriceError("");
    }

    // Check if BaseURI has a / in the end
    if (baseURI[baseURI.length - 1] !== "/") {
      setBaseURIError("Base URI must end with /");
      return;
    } else {
      setBaseURIError("");
    }

    if (isPremintSelected && isMaxMintSelected) {
      if (parseInt(premint) > parseInt(maxTokens)) {
        setStatus("Premint cannot be greater than Max Tokens");
        return;
      }
    }

    // Check if all numeric inputs are above 0
    if (
      parseInt(publicPrice) <= 0 ||
      (isMaxMintSelected && parseInt(maxTokens) <= 0) ||
      (isPremintSelected && parseInt(premint) <= 0) ||
      (isWhiteListSelected && parseInt(whitelistPrice) <= 0)
    ) {
      setStatus("All numeric inputs must be above 0");
      return;
    }

    // If whitelist is enabled, there must be atleast one whitelist
    if (isWhiteListSelected && whitelist.length === 0) {
      setStatus("There must be atleast one whitelist");
      return;
    }

    const data: ERC721DataINT = {
      name: name,
      symbol: symbol,
      premint: premint,
      baseuri: baseURI,
      publicPrice: publicPrice,
      maxTokens: maxTokens,
      whitelist: whitelist,
      whitelistPrice: whitelistPrice,
      iswhitelistselected: isWhiteListSelected,
      ismaxmintselected: isMaxMintSelected,
      isuriselected: isURISelected,
      premintselected: isPremintSelected,
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

    // eslint-disable-next-line no-use-before-define
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });

    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    setLoading(true);
    setStatus("Deploying contract...");
    const conName = getContractName(data);
    console.log("Contract Name: ", conName);

    const abi = ERC721[conName as keyof typeof ERC721][0] as readonly unknown[];
    const bytecode = ERC721[conName as keyof typeof ERC721][1] as `0x${string}`;

    let passedArgs: unknown[] = [];

    passedArgs.push(account);
    passedArgs.push(name);
    passedArgs.push(symbol);
    passedArgs.push(baseURI);
    passedArgs.push(parseInt(publicPrice));

    if (isMaxMintSelected) passedArgs.push(parseInt(maxTokens));
    if (isWhiteListSelected) passedArgs.push(whitelist);
    if (isWhiteListSelected) passedArgs.push(parseInt(whitelistPrice));
    if (isPremintSelected) passedArgs.push(parseInt(premint));

    console.log(passedArgs);

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
          setBaseURI("");
          setPublicPrice("");
          setMaxTokens("");
          setWhitelist([]);
          setWhitelistText("");
          setWhitelistPrice("");
          setPremintSelected(false);
          setWhiteListSelected(false);
          setMaxMintSelected(false);
          setURISelected(false);
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
      <div className="w-1/2 flex justify-center items-center space-x-6 p-3 backdrop-blur-md rounded-2xl">
        <BackButton />
        <h1 className="text-3xl font-mono text-gray-200 font-bold">
          Create your own Non-Fungible Token
        </h1>
      </div>

      {/* Body */}
      <div className="w-3/4 flex flex-col justify-start items-center p-3 backdrop-blur-md rounded-2xl backdrop-brightness-75 overflow-x-hidden overflow-y-scroll">
        {visible && <Confetti />}

        {/* Form */}
        <form className="flex flex-col justify-center items-center w-full p-3 space-y-12">
          {/* Name */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-xl text-center">
                Name:
              </div>
              <div className="basis-3/5">
                <Input
                  key="name_crypto"
                  isRequired
                  type="text"
                  label="Name"
                  placeholder="Bored Ape Yacht Club"
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
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              Enter the name you want to call your NFT. This name will be what
              the NFT will be called on the blockchain.
            </p>
          </div>

          {/* Symbol */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-xl text-center">
                Symbol:
              </div>
              <div className="basis-3/5">
                <Input
                  key="symbol_crypto"
                  isRequired
                  type="text"
                  label="Symbol"
                  placeholder="BAYC"
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
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              This will be the Symbol of your NFT. This will be used on the
              blockchain to identify your NFT.
            </p>
          </div>

          {/* Base URI */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-xl text-center">
                Base URI:
              </div>
              <div className="basis-3/5">
                <Input
                  key="baseuri_crypto"
                  isRequired
                  type="url"
                  label="Base URI"
                  placeholder="ipfs://url/"
                  aria-label="Symbol"
                  className="font-mono"
                  value={baseURI}
                  onValueChange={setBaseURI}
                  isInvalid={baseURIError !== ""}
                  color={baseURIError !== "" ? "danger" : "default"}
                  errorMessage={
                    baseURIError !== "" && "Please enter a valid URI"
                  }
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              This will the base URI for the location that contains your meta
              data files. Recommended to use IPFS. Make sure to have the
              &quot;/&quot; at the end of this URI.
            </p>
          </div>

          {/* Public Price */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5 text-gray-100 font-mono text-xl text-center">
                Public Price:
              </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  min={0}
                  key="public_price_crypto"
                  isRequired={true}
                  label="Public Price"
                  aria-label="Public Price"
                  placeholder="0.00"
                  className="font-mono"
                  value={publicPrice}
                  onValueChange={setPublicPrice}
                  isInvalid={publicPriceError !== ""}
                  color={publicPriceError !== "" ? "danger" : "default"}
                  errorMessage={
                    publicPriceError !== "" && "Please enter a valid Price"
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">ETH</span>
                    </div>
                  }
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              This will the public price of one NFT. Note that the price will be
              in ETH.
            </p>
          </div>

          {/* Max Tokens */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5 flex justify-end items-center pr-12">
                <Switch
                  defaultSelected={false}
                  aria-label="Enable Mint"
                  isSelected={isMaxMintSelected}
                  onValueChange={setMaxMintSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${
                  !isMaxMintSelected && "text-gray-100/40"
                } text-gray-100 font-mono text-xl text-center`}
              >
                Max NFTs:
              </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  min={0}
                  key="maxTokens_crypto"
                  isRequired={false}
                  label={isMaxMintSelected ? "Max NFTs" : "Max NFTs (Disabled)"}
                  aria-label="Max NFTs"
                  className="font-mono"
                  placeholder="1000"
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              This it the maximum NFTs that can exist in the contract. Enable
              this to enter a value, and disable it to keep the max NFTs as
              unlimited.
            </p>
          </div>

          <Divider className="my-4 bg-gray-400/60" />

          {/* Whitelist Zone */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5 flex justify-end items-center pr-12">
                <Switch
                  defaultSelected={false}
                  aria-label="Enable Mint"
                  isSelected={isWhiteListSelected}
                  onValueChange={setWhiteListSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${
                  !isWhiteListSelected && "text-gray-100/40"
                } text-gray-100 font-mono text-xl text-center`}
              >
                Whitelist:
              </div>
              <div className="basis-3/5 flex flex-row justify-center items-center">
                <Input
                  key="whitelist_crypto"
                  type="text"
                  label={
                    isWhiteListSelected ? "Whitelist" : "Whitelist (Disabled)"
                  }
                  disabled={!isWhiteListSelected}
                  aria-label="Whitelist"
                  value={whitelistText}
                  onValueChange={setWhitelistText}
                  isInvalid={isInvalid}
                  className="font-mono"
                  color={isInvalid ? "danger" : "success"}
                  errorMessage={isInvalid && "Please Enter a valid ETH Address"}
                  endContent={
                    <Button
                      onClick={() => addWhitelist()}
                      disabled={!isWhiteListSelected || isInvalid}
                      color="primary"
                      variant="solid"
                      className={`${
                        (!isWhiteListSelected || isInvalid) && "bg-primary/60"
                      }`}
                    >
                      Add
                    </Button>
                  }
                />
              </div>
            </div>
            {whitelist.length > 0 &&
              whitelist.map((address, index) => (
                <div
                  key={address}
                  className="flex flex-row justify-end items-center w-4/6 self-end space-x-4 "
                >
                  <p className="text-gray-300 font-mono text-sm text-right">
                    {address}
                  </p>
                  <button
                    onClick={() => deleteWhitelist(index)}
                    className="text-gray-300 text-sm uppercase font-mono"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              Add Whitelists into your account.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5 flex justify-end items-center pr-12">
                <Switch
                  defaultSelected={false}
                  aria-label="Enable Mint"
                  isSelected={isWhiteListSelected}
                  onValueChange={setWhiteListSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${
                  !isWhiteListSelected && "text-gray-100/40"
                } text-gray-100 font-mono text-xl text-center`}
              >
                Whitelist Price:
              </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  key="whitelist_price_crypto"
                  aria-label="Whitelist Price"
                  disabled={!isWhiteListSelected}
                  placeholder="0.00"
                  className="font-mono"
                  value={whitelistPrice}
                  onValueChange={setWhitelistPrice}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">ETH</span>
                    </div>
                  }
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              This will the whitelist price of one NFT. Note that the price will
              be in ETH. The addresses that you add can purchase the NFT at this
              price.
            </p>
          </div>

          <Divider className="my-4 bg-gray-400/60" />

          {/* Pre Mint */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5  flex justify-end items-center pr-12">
                <Switch
                  defaultSelected={false}
                  aria-label="Enable Mint"
                  isSelected={isPremintSelected}
                  onValueChange={setPremintSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${
                  !isPremintSelected && "text-gray-100/40"
                } text-gray-100 font-mono text-xl text-center`}
              >
                Pre Mint:
              </div>
              <div className="basis-3/5">
                <Input
                  key="mint_crypto"
                  type="number"
                  min={0}
                  label={isPremintSelected ? "Pre Mint" : "Pre Mint (Disabled)"}
                  disabled={!isPremintSelected}
                  className="font-mono"
                  placeholder="5000"
                  aria-label="Mint"
                  value={premint}
                  onValueChange={setPremint}
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs text-right w-4/6 self-end font-mono">
              You can premint a set of tokens when deploying the contract. This
              will add tokens in your contract in your name. It&apos;s important
              to make sure that you either have pre-minted tokens or you have a
              mint function in your contract.
            </p>
          </div>

          <Divider className="my-4 bg-gray-400/60" />

          {/* Choices */}
          <div className="flex flex-row w-full space-x-2 justify-center items-center">
            {/* URI Storage */}
            <div className="w-1/2 flex flex-col justify-center items-center space-y-2">
              <Switch
                defaultSelected
                isSelected={isURISelected}
                onValueChange={setURISelected}
              >
                <p
                  className={`${
                    isURISelected ? "text-gray-100" : "text-gray-100/40"
                  }  font-mono text-xl`}
                >
                  URI Storage
                </p>
              </Switch>
              <p
                className={`${
                  isURISelected ? "text-gray-300" : "text-gray-300/40"
                }  font-mono text-sm text-center`}
              >
                If enabled, this allows you, the person who deploys, to have a
                way to change the URI address. Enabling this will disable Max
                NFTs.
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
                <p className="font-mono text-gray-200 uppercase">
                  {status.toUpperCase().includes("DEPLOYED") ? (
                    <Link
                      href={`https://sepolia.etherscan.io/address/${deployContractAddress}`}
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
