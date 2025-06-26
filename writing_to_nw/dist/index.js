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
const sender = new web3_js_1.Keypair();
const reciever = new web3_js_1.Keypair();
const transferSol = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    const signature = yield connection.requestAirdrop(sender.publicKey, web3_js_1.LAMPORTS_PER_SOL);
    const latestBlockHash = yield connection.getLatestBlockhash();
    yield connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature
    });
    const transferInstruction = web3_js_1.SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: reciever.publicKey,
        lamports: 0.01 * web3_js_1.LAMPORTS_PER_SOL
    });
    const transaction = new web3_js_1.Transaction().add(transferInstruction);
    const transactionSignature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [sender]);
    console.log("Transaction Signature:", `${transactionSignature}`);
    const accountInfo = yield connection.getAccountInfo(reciever.publicKey);
    console.log(JSON.stringify(accountInfo, null, 2));
});
transferSol();
