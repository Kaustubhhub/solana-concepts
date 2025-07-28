import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import type { FC } from 'react'

const RequestAirdrop: FC = () => {
    const [requestSol, setRequestedSol] = useState<number>(0);
    const [currentSol, setCurrentSol] = useState<number>();
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        getAccountDetails()
    }, [publicKey])

    const handleRequestAirdrop = async () => {
        if (!publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        const signature = await connection.requestAirdrop(publicKey, requestSol * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash()

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature
        })

        getAccountDetails()
    }

    const getAccountDetails = async () => {
        if (!publicKey) {
            alert("Please connect your wallet first.");
            return;
        }
        const details = await connection.getAccountInfo(publicKey)
        console.log(details?.lamports)
        if (!details?.lamports) {
            alert("no lamports");
            return;
        }
        setCurrentSol(details?.lamports / LAMPORTS_PER_SOL)
    }

    return (
        <div>
            <label htmlFor="">Input sol : </label>
            <input
                value={requestSol === 0 ? "" : requestSol}
                onChange={(e) => {
                    const value = e.target.value;
                    const parsed = parseFloat(value);
                    if (value === "") {
                        setRequestedSol(0);
                    } else if (!isNaN(parsed)) {
                        setRequestedSol(parsed);
                    }
                }}
                type="text"
            />

            <button onClick={handleRequestAirdrop}>Request airdrop</button>


            <h3>Account Info : </h3>
            <label htmlFor="">Current balance: </label>{currentSol}
            <button onClick={getAccountDetails}>get current balance</button>
        </div>
    )
}

export default RequestAirdrop;