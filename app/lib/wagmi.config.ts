import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets';
import { type Chain } from 'viem';
import { sepolia } from 'viem/chains';
import { createConfig, http, injected } from 'wagmi';
import { toPrivyWallet } from '@privy-io/cross-app-connect/rainbow-kit';

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

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        toPrivyWallet({
          id: 'clxva96js0039k9pb3pw2uovx', // The Privy app id of provider application
          name: 'Privy Pinjoc', // The name of the provider application
          iconUrl: '/logo.png', // The icon to appear in the connector modal
        }),
        metaMaskWallet,
        rabbyWallet,
      ],
    },
  ],
  {
    appName: 'Pinjoc',
    projectId: 'secret',
  }
);

// TODO: change to monad when ready
export const chains: readonly [Chain, ...Chain[]] = [sepolia];
export const transports = {
  [sepolia.id]: http(),
};
