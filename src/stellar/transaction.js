import StellarSdk from 'stellar-sdk'
import store from '../store'

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

export const addTrustline = async function () {
    const contributionAccount = store.getters.contribution;
    const everToken = store.getters.everToken;

    const account = await server.loadAccount(contributionAccount.public);
    const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: new StellarSdk.Asset(everToken.code, everToken.GA),
            limit: everToken.limit
        })).build();

    transaction.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
    const result = await server.submitTransaction(transaction);
    return result;
}

export const addDASignerAndUpdateWeight = async function () {
    // sets DA as a signer with weight 1 and sets own weight to 1
    // sets medium thresold to 2
    const contributionAccount = store.getters.contribution;
    const everToken = store.getters.everToken;
    const account = await server.loadAccount(contributionAccount.public);
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

    transaction.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
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

export const generateIcoTransactions = async function (xlmAmount) {
    const contributionAccount = store.getters.contribution;
    const everToken = store.getters.everToken;

    const account = await server.loadAccount(contributionAccount.public);
    const transaction1 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: new StellarSdk.Asset.native,
            buying: new StellarSdk.Asset(everToken.code, everToken.GA),
            amount: xlmAmount,
            price: 0.5,
            offerId: 0,
        })).build();

    const transaction2 = new StellarSdk.TransactionBuilder(account) // needs to be time locked with D ICO conclusion date
        .addOperation(StellarSdk.Operation.setOptions({
            masterWeight: 2,
        })).build();

    const transaction3 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: new StellarSdk.Asset(everToken.code, everToken.GA),
            buying: new StellarSdk.Asset.native,
            amount: xlmAmount,
            price: 0.5,
            offerId: 0,
        })).build();
    
    transaction1.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
    transaction2.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
    transaction3.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
    return {
        transaction1,
        transaction2,
        transaction3
    }
}