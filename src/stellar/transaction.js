import StellarSdk from 'stellar-sdk'
import store from '../store'

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

export const addTrustline = async function (caPublic, caSecret) {
    const everToken = store.getters.everToken;

    const account = await server.loadAccount(caPublic);
    const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: new StellarSdk.Asset(everToken.code, everToken.GA),
            limit: everToken.limit
        })).build();

    transaction.sign(StellarSdk.Keypair.fromSecret(caSecret));
    const result = await server.submitTransaction(transaction);
    return result;
}

export const addDASignerAndUpdateWeight = async function (caPublic, caSecret) {
    // sets DA as a signer with weight 1 and sets own weight to 1
    // sets medium thresold to 2

    const everToken = store.getters.everToken;
    const account = await server.loadAccount(caPublic);
    const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.setOptions({
            masterWeight: 1,
            medThreshold: 2,
            lowThreshold: 2,
            highThreshold: 2,
            signer: {
                ed25519PublicKey: everToken.DA,
                weight: 1
            }
        })).build();

    transaction.sign(StellarSdk.Keypair.fromSecret(caSecret));
    const result = await server.submitTransaction(transaction);
    return result;
}

export const generateAccount = function () {
    var pair = StellarSdk.Keypair.random();
    return {
        publicKey: pair.publicKey(),
        secretKey: pair.secret()
    }
}

export const getAccountBalance = function (publicKey) {
    return server.accounts()
        .accountId(publicKey)
        .call()
}

export const generateIcoTransactions = async function (xlmAmount, caPublic, caSecret) {
const everToken = store.getters.everToken;

    const account = await server.loadAccount(caPublic);
    console.log(account.sequenceNumber());
    const transaction1 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: new StellarSdk.Asset.native,
            buying: new StellarSdk.Asset(everToken.code, everToken.GA),
            amount: xlmAmount,
            price: 0.5,
            offerId: 0,
        })).build();
    const sequenceNumber = account.sequenceNumber();
    account.sequence = sequenceNumber;
    console.log(account.sequenceNumber());
    const transaction2 = new StellarSdk.TransactionBuilder(account) // needs to be time locked with D ICO conclusion date
        .addOperation(StellarSdk.Operation.setOptions({
            masterWeight: 1,
            medThreshold: 0,
            lowThreshold: 0,
            highThreshold: 0,
            signer: {
                ed25519PublicKey: everToken.DA,
                weight: 0
            }
        })).build();
    // account.incrementSequenceNumber();
    account.sequence = sequenceNumber;
    console.log(account.sequenceNumber());
    const transaction3 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: new StellarSdk.Asset(everToken.code, everToken.GA),
            buying: new StellarSdk.Asset.native,
            amount: xlmAmount,
            price: 0.5,
            offerId: 0,
        }))
        .addOperation(StellarSdk.Operation.setOptions({
            masterWeight: 1,
            medThreshold: 0,
            lowThreshold: 0,
            highThreshold: 0,
            signer: {
                ed25519PublicKey: everToken.DA,
                weight: 0
            }
        }))
        .build();

    transaction1.sign(StellarSdk.Keypair.fromSecret(caSecret));
    transaction2.sign(StellarSdk.Keypair.fromSecret(caSecret));
    transaction3.sign(StellarSdk.Keypair.fromSecret(caSecret));
    return {
        transaction1,
        transaction2,
        transaction3
    }
}

export const submitXdr = async function (xdr) {
    const transaction = new StellarSdk.Transaction(xdr);
    const result = await server.submitTransaction(transaction);
    return result;
}