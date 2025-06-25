import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js'

const keypair = Keypair.generate();
const publicKey = keypair.publicKey;

const fetchWalletAccount = async() =>{
    
    const connection = new Connection("http://127.0.0.1:8899","confirmed");

    const signature = await connection.requestAirdrop(publicKey,LAMPORTS_PER_SOL);

    const latestBlockHash = await connection.getLatestBlockhash()

    await connection.confirmTransaction({
        blockhash:latestBlockHash.blockhash,
        lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
        signature:signature
    });

    const accountInfo = await connection.getAccountInfo(publicKey)
    console.log(JSON.stringify(accountInfo, null, 2));
}

const fetchTokenAccount = async() =>{
    const connection = new Connection("http://127.0.0.1:8899","confirmed")
    const address = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

    const accountInfo = await connection.getAccountInfo(address)

    console.log(
        JSON.stringify(
            accountInfo,
            (key, value) => {
                if (key === "data" && value && value.length > 1) {
                    return [
                    value[0],
                    "...truncated, total bytes: " + value.length + "...",
                    value[value.length - 1]
                    ];
                }
                return value;
                },
            2
        )
    );
}

fetchTokenAccount();