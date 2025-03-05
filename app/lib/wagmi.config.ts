import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rabbyWallet } from "@rainbow-me/rainbowkit/wallets";
import { type Chain } from "viem";
import { sepolia } from "viem/chains";
import { createConfig, http, injected } from "wagmi";

/*
const projectId = import.meta.env.VITE_CONNECT_WALLET_PROJECT_ID;

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, rabbyWallet],
    },
  ],
  {
    appName: 'Pinjoc',
    projectId: projectId,
  }
);

export const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://testnet-explorer.monad.xyz',
    },
  },
} as const satisfies Chain;

export const chains: readonly [Chain, ...Chain[]] = [monadTestnet];
*/

// TODO: change to monad when ready
export const connectors = [injected()];
export const chains: readonly [Chain, ...Chain[]] = [sepolia];
export const transports = {
	[sepolia.id]: http(),
};
