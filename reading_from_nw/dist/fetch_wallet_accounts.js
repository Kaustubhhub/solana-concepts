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
const keypair = web3_js_1.Keypair.generate();
const publicKey = keypair.publicKey;
const fetchWalletAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const signature = yield connection.requestAirdrop(publicKey, web3_js_1.LAMPORTS_PER_SOL);
    const latestBlockHash = yield connection.getLatestBlockhash();
    // await connection.confirmTransaction(signature,"confirmed");
    yield connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature
    });
    const accountInfo = yield connection.getAccountInfo(publicKey);
    console.log(JSON.stringify(accountInfo, null, 2));
});
const fetchTokenAccount = () => __awaiter(void 0, void 0, void 0, function* () {
});
fetchWalletAccount();
