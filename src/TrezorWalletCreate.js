import TrezorConnect from 'trezor-connect';

const createWallet = () => {
  const _trezorWallet = new TrezorWallet();
  return _trezorWallet;
};

class TrezorWallet {
  constructor() {
    TrezorConnect.manifest({
      email: 'developer@xyz.com',
      appUrl: 'http://your.application.com',
    });
  }

  getAvailableFunds = async (params) => {
    const { coin } = params;
    const res = await TrezorConnect.getAccountInfo({ coin });
    return res.payload.balance;
  };

  composeTransaction = async (params) => {
    const { amount, address, coin } = params;

    const res = await TrezorConnect.composeTransaction({
      outputs: [{ amount, address }],

      coin,
      push: true,
    });
    console.log('res from sending trasaction: ', res);
    return res;
  };
}

export default createWallet;
