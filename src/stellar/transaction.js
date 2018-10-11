import StellarSdk from 'stellar-sdk'
import store from '../store'

//TODO: Select Stellar server (public/testnet) depending on configuration
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

/*   outcome/
 * This function will return the user account balance.
 * By using public key of user.
 */
export const getAccountBalance = function (publicKey) {
    return server.accounts()
        .accountId(publicKey)
        .call()
};
