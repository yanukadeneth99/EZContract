"use client";
import BackButton from "@/components/BackButton";
import { Button, Divider, Input, Switch, Link } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

export default function NFT() {
  // States to control toggles
  const [isMintSelected, setMintSelected] = useState<boolean>(false);
  const [isWhiteListSelected, setWhiteListSelected] = useState<boolean>(false);
  const [isMaxMintSelected, setMaxMintSelected] = useState<boolean>(false);
  const [isURISelected, setURISelected] = useState<boolean>(false);
  const [isEnumerableSelected, setEnumerableSelected] =
    useState<boolean>(false);
  const [isBurnableSelected, setBurnableSelected] = useState<boolean>(false);
  const [isPausableSelected, setPausableSelected] = useState<boolean>(false);

  // States to Hold Data
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [securityEmail, setSecurityEmail] = useState<string>("");
  const [baseURI, setBaseURI] = useState<string>("");
  const [publicPrice, setPublicPrice] = useState<string>("");
  const [maxTokens, setMaxTokens] = useState<string>("");
  const [whitelistText, setWhitelistText] = useState<string>("");
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [whitelistPrice, setWhitelistPrice] = useState<string>("");
  const [premint, setPremint] = useState<string>("");

  // States to Hold Errors
  const [nameError, setNameError] = useState<string>("");
  const [symbolError, setSymbolError] = useState<string>("");
  const [baseURIError, setBaseURIError] = useState<string>("");
  const [publicPriceError, setPublicPriceError] = useState<string>("");

  // Regex Test for Whitelist Address
  const validateEmail = (value: string) => value.match(/^0x[a-fA-F0-9]{40}$/gm);

  const isInvalid = useMemo(() => {
    if (whitelistText === "") return false;

    return validateEmail(whitelistText) ? false : true;
  }, [whitelistText]);

  function addWhitelist() {
    if (isInvalid) return;
    if (whitelistText === "") return;
    setWhitelist([...whitelist, whitelistText]);
    setWhitelistText("");
  }

  function deleteWhitelist(index: number) {
    const newWhitelist = whitelist.filter((_, i) => i !== index);
    setWhitelist(newWhitelist);
  }

  // Reset Max Mint if URI is selected
  useEffect(() => {
    if (isMaxMintSelected) setMaxMintSelected(false);
  }, [isURISelected]);

  // Submit Function
  function submit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      email: securityEmail,
      premint: premint,
      premintselected: isMintSelected,
      enumerable: isEnumerableSelected,
      burnable: isBurnableSelected,
      pausable: isPausableSelected,
    });

    console.log(data);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Header */}
      <div className="w-full flex justify-start items-center p-6 pt-12">
        <BackButton />
      </div>

      {/* Body */}
      <div className="w-3/4 flex flex-col justify-start items-center p-12 space-y-24">
        {/*  */}
        <h1 className="text-4xl font-bold">
          Create your own Non Fungible Token
        </h1>

        {/* Form */}
        <form className="flex flex-col justify-center items-center w-full p-3 space-y-12">
          {/* Name */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5">Name: </div>
              <div className="basis-3/5">
                <Input
                  key="name_crypto"
                  isRequired
                  type="text"
                  label="Name"
                  placeholder="Bored Ape Yacht Club"
                  aria-label="Name"
                  value={name}
                  onValueChange={setName}
                  isInvalid={nameError !== ""}
                  color={nameError !== "" ? "danger" : "default"}
                  errorMessage={nameError !== "" && "Please enter a valid name"}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              Enter the name you want to call your NFT. This name will be what
              the NFT will be called on the blockchain.
            </p>
          </div>

          {/* Symbol */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5">Symbol: </div>
              <div className="basis-3/5">
                <Input
                  key="symbol_crypto"
                  isRequired
                  type="text"
                  label="Symbol"
                  placeholder="BAYC"
                  aria-label="Symbol"
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
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This will be the Symbol of your NFT. This will be used on the
              blockchain to identify your NFT.
            </p>
          </div>

          {/* Security Address */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5">Security Email: </div>
              <div className="basis-3/5">
                <Input
                  key="security_email_crypto"
                  isRequired={false}
                  type="email"
                  label="Security Email"
                  placeholder="security@company.com"
                  aria-label="Security Email"
                  value={securityEmail}
                  onValueChange={setSecurityEmail}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This is an optional field to add your security email in the
              contract to contact you incase someone finds a bug in your
              contract. Note that this email will be visible to everyone on the
              blockchain.
            </p>
          </div>

          {/* Base URI */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5">Base URI: </div>
              <div className="basis-3/5">
                <Input
                  key="baseuri_crypto"
                  isRequired
                  type="url"
                  label="Base URI"
                  placeholder="ipfs://url"
                  aria-label="Symbol"
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
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This will the base URI for the location that contains your meta
              data files. Recommended to use IPFS. Make sure to have the
              &quot;/&quot; at the end of this URI.
            </p>
          </div>

          {/* Public Price */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5"></div>
              <div className="basis-1/5">Public Price: </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  key="public_price_crypto"
                  isRequired={true}
                  label="Public Price"
                  aria-label="Public Price"
                  placeholder="0.00"
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
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
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
                  onValueChange={() =>
                    setMaxMintSelected(
                      isURISelected ? false : !isMaxMintSelected
                    )
                  }
                />
              </div>
              <div
                className={`basis-1/5 ${!isMaxMintSelected && "text-gray-500"}`}
              >
                Max NFTs:
              </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  key="maxTokens_crypto"
                  isRequired={false}
                  label={isMaxMintSelected ? "Max NFTs" : "Max NFTs (Disabled)"}
                  aria-label="Max NFTs"
                  placeholder="1000"
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This it the maximum NFTs that can exist in the contract. Enable
              this to enter a value, and disable it to keep the max NFTs as
              unlimited.
            </p>
          </div>

          <Divider className="my-4 bg-gray-700/60" />

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
                  !isWhiteListSelected && "text-gray-500"
                }`}
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
                  className="flex flex-row justify-end items-center w-4/6 self-end space-x-4"
                >
                  <p className="text-gray-600 text-sm text-right ">{address}</p>
                  <button
                    onClick={() => deleteWhitelist(index)}
                    className="text-gray-400 text-sm uppercase"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
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
                  !isWhiteListSelected && "text-gray-500"
                }`}
              >
                Whitelist Price:{" "}
              </div>
              <div className="basis-3/5">
                <Input
                  type="number"
                  key="whitelist_price_crypto"
                  aria-label="Whitelist Price"
                  disabled={!isWhiteListSelected}
                  placeholder="0.00"
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
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This will the whitelist price of one NFT. Note that the price will
              be in ETH. The addresses that you add can purchase the NFT at this
              price.
            </p>
          </div>

          <Divider className="my-4 bg-gray-700/60" />

          {/* Pre Mint */}
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="basis-1/5  flex justify-end items-center pr-12">
                <Switch
                  defaultSelected={false}
                  aria-label="Enable Mint"
                  isSelected={isMintSelected}
                  onValueChange={setMintSelected}
                />
              </div>
              <div
                className={`basis-1/5 ${!isMintSelected && "text-gray-500"}`}
              >
                Pre Mint:
              </div>
              <div className="basis-3/5">
                <Input
                  key="mint_crypto"
                  type="number"
                  label={isMintSelected ? "Pre Mint" : "Pre Mint (Disabled)"}
                  disabled={!isMintSelected}
                  placeholder="5000"
                  aria-label="Mint"
                  value={premint}
                  onValueChange={setPremint}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              You can premint a set of tokens when deploying the contract. This
              will add tokens in your contract in your name. It&apos;s important
              to make sure that you either have pre-minted tokens or you have a
              mint function in your contract.
            </p>
          </div>

          <Divider className="my-4 bg-gray-700/60" />

          {/* Choices */}
          <div className="flex flex-row w-full space-x-2">
            {/* Burnable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/4">
              <Switch
                defaultSelected={false}
                isSelected={isBurnableSelected}
                onValueChange={setBurnableSelected}
              >
                <p className="text-gray-100">Burnable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
                If enabled, this allows anyone who owns token to Burn Tokens.
                Burning tokens is a way to remove tokens from circulation by
                transferring them to a dead address.
              </p>
            </div>

            {/* Pausable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/4">
              <Switch
                defaultSelected
                isSelected={isPausableSelected}
                onValueChange={setPausableSelected}
              >
                <p className="text-gray-100">Pausable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
                If enabled, this allows you, the person who deploys, to have the
                ability to pause main transactions of the contract. This is
                useful if you want to stop all transactions in case of a bug or
                a hack.
              </p>
            </div>

            {/* Enumerable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/4">
              <Switch
                defaultSelected={false}
                isSelected={isEnumerableSelected}
                onValueChange={setEnumerableSelected}
              >
                <p className="text-gray-100">Enumerable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
                If enabled, this changes the contract to track additional
                information about the tokens. You can find more{" "}
                <Link
                  isExternal
                  className="text-sm"
                  href="https://docs.openzeppelin.com/contracts/5.x/api/token/erc721#ERC721Enumerable"
                >
                  here
                </Link>
              </p>
            </div>

            {/* URI Storage */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/4">
              <Switch
                defaultSelected
                isSelected={isURISelected}
                onValueChange={setURISelected}
              >
                <p className="text-gray-100">URI Storage</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
                If enabled, this allows you, the person who deploys, to have a
                way to change the URI address. Enabling this will disable Max
                NFTs.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="pb-24 w-full flex justify-center items-center">
            <Button
              onClick={(e) => submit(e)}
              type="submit"
              size="lg"
              color="primary"
              variant="shadow"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
