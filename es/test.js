import {PrivateKey, PublicKey, Address, Serializer, ops, types} from "./";
// import { Apis } from 'bitsharesjs-ws';
import {Apis, ChainConfig} from "bitsharesjs-ws";

var trans = {
    expiration: "2018-07-09T09:30:00",
    ref_block_num: 22062,
    ref_block_prefix: 3050763070,
    operations: [
        [
            3,
            {
                fee: {
                    amount: 100,
                    asset_id: "1.3.0"
                },
                funding_account: "1.2.103393",
                delta_collateral: {
                    amount: 1000,
                    asset_id: "1.3.0"
                },
                delta_debt: {
                    amount: 10,
                    asset_id: "1.3.113"
                },
                extensions: {
                    target_collateral_ratio: 200
                }
            }
        ]
    ]

    // curl - d '{"id":1,"method":"call","params":[0,"get_transaction_hex",[{}]]}' https://btsapi.magicw.net/ws
};
Apis.instance("wss://btsapi.magicw.net/ws", true).init_promise.then(function() {
    var b = ops.transaction.toBuffer(trans);

    console.log(b.toString("hex"));
    // get from backend. remove signatures. see https://github.com/bitshares/bitsharesjs/issues/13#issuecomment-348684435
    //var c =
    //    "8fc336d8d65b6d1a215a0106bd0400000000000000bb921b010300000002d2d60901009ff91a01000202def83f652f3d47a2f96b97928779bcc7155db4c1fa7570f60e3af07647777da6010003b666ae35954e2b7b3e5e3430f49b0a971b3e8f13cfb3240055205f758abfd6250100000102000000029ff91a0100eb8f1d010001020f08edaefcacd7dd29ffb51b4b3b20fe1f5c0946b4e11fd499c093a5234201d0010000000000";
    //assert(b);
    //assert(b.toString("hex") == c);
    Apis.instance()
        .db_api()
        .exec("get_transaction_hex", [trans])
        .then(function(r) {
            console.log(r);
        })
        .catch(console.error);
});
