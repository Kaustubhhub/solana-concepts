import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptAccount, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
const TokenLaunchpad = () => {

    const wallet = useWallet()
    const connection = useConnection()
    const handleCreateToken = async () => {
        if (!wallet.publicKey || !wallet.signTransaction) {
            return;
        }

        const lamports = await getMinimumBalanceForRentExemptAccount(connection.connection);
        const keypair = Keypair.generate()

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 1, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        )
        transaction.partialSign(keypair)
        await wallet.signTransaction(transaction)
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px"
        }}>
            <h2>Solana token launchpad</h2>
            <input type="text" placeholder="Token Name" /> <br />
            <input type="text" placeholder="Symbol" /><br />
            <input type="text" placeholder="Image URL" /><br />
            <input type="text" placeholder="Initial Supply" /><br />
            <button onClick={handleCreateToken}>create a token</button>
        </div>
    );
};

export default TokenLaunchpad;
