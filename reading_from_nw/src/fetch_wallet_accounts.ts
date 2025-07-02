import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js'
import {getMint} from "@solana/spl-token"

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

const fetchMintAccount= async() =>{
    const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed")
    const publicKey = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

    const accountInfo = await connection.getAccountInfo(publicKey);

    console.log(accountInfo)

    console.log(JSON.stringify(accountInfo,
                (key,value)=>{
                    if(key === "data" && value && value.length >1){
                        return [
                            value[0],
                            "...truncated, total bytes: " + value.length + "...",
                            value[value.length - 1]
                        ]
                    }
                    return value
                }
            ,
            2
        )
    )
}

const deserialiseMintAccount = async() =>{
    const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed")
    const publicKey = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

    const mint = await getMint(connection, publicKey, "confirmed")

    console.log(JSON.stringify(
        mint,
        (key,value)=>{
            if(typeof value === "bigint"){
                return value.toString()
            }

            if(Buffer.isBuffer(value)){
                return `<Buffer ${value.toString("hex")}>`
            }

            return value;
        },
        2
    ))
}

deserialiseMintAccount()
