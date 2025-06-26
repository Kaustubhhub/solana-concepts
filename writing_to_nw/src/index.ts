import { Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const sender = new Keypair();
const reciever = new Keypair();

const transferSol = async() =>{
    
    const connection = new Connection("http://localhost:8899","confirmed");
    const signature = await connection.requestAirdrop(sender.publicKey, LAMPORTS_PER_SOL);

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature
    });

    const transferInstruction = SystemProgram.transfer({
        fromPubkey:sender.publicKey,
        toPubkey:reciever.publicKey,
        lamports: 0.01*LAMPORTS_PER_SOL
    })

    const transaction = new Transaction().add(transferInstruction);

    const transactionSignature = await sendAndConfirmTransaction(connection,transaction,[sender]);
    console.log("Transaction Signature:", `${transactionSignature}`);

    const accountInfo = await connection.getAccountInfo(reciever.publicKey)
    console.log(JSON.stringify(accountInfo, null, 2));

}

transferSol()

