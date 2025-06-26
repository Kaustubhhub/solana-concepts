import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptAccount, MINT_SIZE, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
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

const createToken = async() =>{
    
    const connection = new Connection("http://localhost:8899","confirmed");
    const wallet = new Keypair();

    const signature = await connection.requestAirdrop(wallet.publicKey,LAMPORTS_PER_SOL);

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash:latestBlockHash.blockhash,
        lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
        signature
    })

    const mint = new Keypair();

    const rentExemptionLamports = await getMinimumBalanceForRentExemptAccount(connection)

    const createAccountinstruction =  SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mint.publicKey,
        lamports: rentExemptionLamports,
        programId: TOKEN_2022_PROGRAM_ID,
        space: MINT_SIZE
    })

    const initialiseMintInstruction = createInitializeMint2Instruction(
        mint.publicKey,
        2, // decimals
        wallet.publicKey, // mint authority
        wallet.publicKey, // freeze authority
        TOKEN_2022_PROGRAM_ID
    )

    const transaction = new Transaction().add(createAccountinstruction,initialiseMintInstruction)

    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [wallet,mint]
    )

    console.log("Mint Account:", `${mint.publicKey}`);
    console.log("Transaction Signature:", `${transactionSignature}`);
}

createToken()

