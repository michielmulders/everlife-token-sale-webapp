import StellarSdk from 'stellar-sdk'
import store from '../store'

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

export const listenForPayment = function () {
    const contributionAccount = store.getters.contribution;
    server.operations()
        .forAccount(contributionAccount.public)
        .cursor('now')
        .stream({
            onmessage: function (response) {
                console.log(response);
            }
        })
}

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

export const generateIcoTransactions = async function(xlmAmount){
    const contributionAccount = store.getters.contribution;
    const everToken = store.getters.everToken;

    const account = await server.loadAccount(contributionAccount.public);
    const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: new StellarSdk.Asset.native, 
            buying: new StellarSdk.Asset(everToken.code, everToken.GA),
            amount: xlmAmount,
            price: 0.5,
            offerId: 0,
        })).build();

    transaction.sign(StellarSdk.Keypair.fromSecret(contributionAccount.secret));
    // const result = await server.submitTransaction(transaction);
    return transaction;
}