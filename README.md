# EZContract

Create contracts with an interface, never having to worry about typing code.

## What is EZContract?

EZContract is an easy way to deploy contracts on the [XRP EVM Sidechain](https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/). Instead of writing Solidity Code with Hardhat to deploy, simply fill in the information about your project and just deploy!

Contracts deployed using EZContract are not stored anywhere nor controlled by us. Everything you create, you own completely. To be honest, we don't even know what you did after you deployed.

## How does EZContract work

Select which contract to deploy:

![DeployImage](https://i.imgur.com/fjzLKck.jpg)

Fill out the form, and submit!

![FillFormERC20](https://i.imgur.com/d6gYPKq.jpg)

## XRP EVM Sidechain

This is the newest project by the XRP Team to have an EVM comptaible chain for smart contracts!

You can easily add the XRP EVM Sidechain network after selecting what contract to deploy:

![XRPWalletAddGIF](https://i.imgur.com/DPQ5yYP.gif)

Some highlights of the EVM sidechain include:

- Support for 1000 transactions per second, enabling large loads and throughput.
- Low transaction confirmation times, producing a block every 5 seconds.
- 1 block finalization time; once a block is added to the chain and confirmed, it's considered final.
- Full Ethereum Virtual Machine (EVM) compatibility, enabling you to connect your wallet and interact with or deploy smart contracts written in Solidity.

## Phases

- Phase 1 - Working on the current version on ERC 20, ERC 721 and ERC 1155 to make the User Experience better.
- Phase 2 - Upcoming
- Phase 3 - Upcoming

## Contribution

Feel free to contribute to this project to make it better and add in new features and contracts!

## Analytics

This Application contains Firebase Analytics to collect information in order to improve the application.

## FAQ

Q: Is this production ready?
A: Absolutely NOT. The contracts haven't been audited yet for Production application. This application should only be used for development purposes.

Q: Is this application free?
A: Yes, this application is meant to be free; open-source, community project.

## Setup

Make an `.env.local` file and fill in the following information

```env
NEXT_PUBLIC_APP_NAME=""
NEXT_PUBLIC_APP_ID=""
```

Go to [WalletConnect](https://cloud.walletconnect.com/sign-in) to get your own App ID.
