import React, { useState } from 'react';
import createWallet from './TrezorWalletCreate';

const SELECTED_COIN = 'LTC';

const parseTransactionValue = (value) => {
  //amount - obligatory string value to send in satohosi
  return (value * 100000000).toString();
};
function App() {
  const [wallet, setWallet] = useState();
  const [address, setAddress] = useState(
    'ltc1qpnnnp3vak7jhqncmxjegmaz95dtff28l7chk5l',
  );
  const [funds, setFunds] = useState();
  const [transactionValue, setTransactionValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);

  const login = async () => {
    const walletInstance = createWallet();
    setWallet(walletInstance);

    //get balance
    const balance = await walletInstance.getAvailableFunds({
      coin: SELECTED_COIN,
    });
    setFunds(`0.${balance}`);

    setLoggedIn(true);
  };

  const sendTransaction = async () => {
    await wallet.composeTransaction({
      amount: parseTransactionValue(transactionValue),
      address,
      coin: SELECTED_COIN,
    });

    setTransactionCompleted(true);
  };

  if (transactionCompleted) {
    return <h1>Transaction successful! Please wait for funds to arrive</h1>;
  }

  return (
    <>
      {!loggedIn ? (
        <>
          <h1>login with trezor device</h1>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h1>{`${SELECTED_COIN} balance: ${funds}`}</h1>
          <br />
          <label>Recipient: </label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <label>Amount to send: </label>
          <input
            value={transactionValue}
            onChange={(e) => setTransactionValue(e.target.value)}
          />
          <br />
          {funds > transactionValue ? (
            <button onClick={sendTransaction}>Send</button>
          ) : (
            'You do not have sufficient funds'
          )}
        </>
      )}
    </>
  );
}

export default App;
