"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const keypair = web3_js_1.Keypair.generate();
const publicKey = keypair.publicKey;
const fetchWalletAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const signature = yield connection.requestAirdrop(publicKey, web3_js_1.LAMPORTS_PER_SOL);
    const latestBlockHash = yield connection.getLatestBlockhash();
    yield connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature
    });
    const accountInfo = yield connection.getAccountInfo(publicKey);
    console.log(JSON.stringify(accountInfo, null, 2));
});
const fetchTokenAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const address = new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    const accountInfo = yield connection.getAccountInfo(address);
    console.log(JSON.stringify(accountInfo, (key, value) => {
        if (key === "data" && value && value.length > 1) {
            return [
                value[0],
                "...truncated, total bytes: " + value.length + "...",
                value[value.length - 1]
            ];
        }
        return value;
    }, 2));
});
const fetchMintAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const publicKey = new web3_js_1.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const accountInfo = yield connection.getAccountInfo(publicKey);
    console.log(accountInfo);
    console.log(JSON.stringify(accountInfo, (key, value) => {
        if (key === "data" && value && value.length > 1) {
            return [
                value[0],
                "...truncated, total bytes: " + value.length + "...",
                value[value.length - 1]
            ];
        }
        return value;
    }, 2));
});
const deserialiseMintAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const publicKey = new web3_js_1.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const mint = yield (0, spl_token_1.getMint)(connection, publicKey, "confirmed");
    console.log(JSON.stringify(mint, (key, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        if (Buffer.isBuffer(value)) {
            return `<Buffer ${value.toString("hex")}>`;
        }
        return value;
    }, 2));
});
deserialiseMintAccount();
