"use client";
import BackButton from "@/components/BackButton";
import { Button, Divider, Input, Switch } from "@nextui-org/react";
import { useState } from "react";

export default function FT() {
  // States to control toggles
  const [isMintSelected, setMintSelected] = useState<boolean>(false);
  const [isMintableSelected, setMintableSelected] = useState<boolean>(false);
  const [isBurnableSelected, setBurnableSelected] = useState<boolean>(false);
  const [isPausableSelected, setPausableSelected] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Header */}
      <div className="w-full flex justify-start items-center p-6 pt-12">
        <BackButton />
      </div>

      {/* Body */}
      <div className="w-3/4 flex flex-col justify-start items-center p-12 space-y-24">
        {/*  */}
        <h1 className="text-4xl font-bold">Create your own Fungible Token</h1>

        {/* Form */}
        <div className="flex flex-col justify-center items-center w-full p-3 space-y-12">
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
                  placeholder="Bitcoin"
                  aria-label="Name"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              Enter the name you want to call your Cryptocurrency. This name
              will be what the Cryptocurrency will be called on the blockchain.
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
                  placeholder="BTC"
                  aria-label="Symbol"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm text-right w-4/6 self-end">
              This will be the Symbol of your Cryptocurrency. This will be used
              on the blockchain to identify your Cryptocurrency.
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
          <div className="flex flex-row w-full">
            {/* Mintable */}
            <div className="flex flex-col justify-start items-center space-y-2 basis-1/3">
              <Switch
                defaultSelected={false}
                isSelected={isMintableSelected}
                onValueChange={setMintableSelected}
              >
                <p className="text-gray-100">Mintable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
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
                <p className="text-gray-100">Burnable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
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
                <p className="text-gray-100">Pausable</p>
              </Switch>
              <p className="text-gray-600 text-sm text-center">
                If enabled, this allows you, the person who deploys, to have the
                ability to pause main transactions of the contract. This is
                useful if you want to stop all transactions in case of a bug or
                a hack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Form */}
      <div className="pb-24 w-full flex justify-center items-center">
        <Button size="lg" color="primary" variant="shadow">
          Submit
        </Button>
      </div>
    </div>
  );
}
