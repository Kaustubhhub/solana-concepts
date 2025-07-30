import { useMemo } from 'react';
import type { FC } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './components/RequestAirDrop';


export const App: FC = () => {

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/V4Y7MtdoHLcK68DKqqGKZ"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
            {/* <WalletDisconnectButton /> */}
            <RequestAirdrop/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
