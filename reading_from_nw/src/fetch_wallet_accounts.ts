import {Connection, Keypair, LAMPORTS_PER_SOL} from '@solana/web3.js'

const keypair = Keypair.generate();
const publicKey = keypair.publicKey;

const fetchWalletAccount = async() =>{
    
    const connection = new Connection("http://127.0.0.1:8899","confirmed");

    const signature = await connection.requestAirdrop(publicKey,LAMPORTS_PER_SOL);

    const latestBlockHash = await connection.getLatestBlockhash()

    // await connection.confirmTransaction(signature,"confirmed");
    await connection.confirmTransaction({
        blockhash:latestBlockHash.blockhash,
        lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
        signature:signature
    });

    const accountInfo = await connection.getAccountInfo(publicKey)
    console.log(JSON.stringify(accountInfo, null, 2));
}

const fetchTokenAccount = async() =>{

}

fetchWalletAccount();