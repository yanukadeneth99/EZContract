import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});

// JSON-RPC Account
export const [account] = await walletClient.getAddresses();
