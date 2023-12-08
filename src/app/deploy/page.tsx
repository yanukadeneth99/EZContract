import ContractBlock from "@/components/ContractBlock";

export default function Deploy() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/5 h-4/5 flex flex-col space-y-6 lg:space-y-0 lg:space-x-6 lg:flex-row justify-center items-center p-3">
        <ContractBlock
          title="ERC-20"
          tagline="Cryptocurrency"
          description="Deploy this contract when you want to create a crypto currency that people can trade with."
          path="/deploy/20"
        />

        <ContractBlock
          title="ERC-721"
          tagline="NFT"
          description="Deploy this contract when you want to create a NFT that people can mint. One NFT can only be owned by one person."
          path="/deploy/721"
        />

        <ContractBlock
          title="ERC-1155"
          tagline="NFT"
          description="Deploy this contract when you want to create a NFT that people can mint. One NFT can be owned by multiple people."
          path="/deploy/1155"
        />
      </div>
    </main>
  );
}
