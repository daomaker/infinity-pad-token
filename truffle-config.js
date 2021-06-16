require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const MainProvider = new HDWalletProvider(process.env['DEPLOYER_PRIVATE_KEY'], `https://mainnet.infura.io/v3/${process.env['INFURA_KEY']}`);
const KovanProvider = new HDWalletProvider(process.env['DEPLOYER_PRIVATE_KEY'], `https://kovan.infura.io/v3/${process.env['INFURA_KEY']}`);

module.exports = {
  api_keys: {
    etherscan: process.env['ETHERSCAN_KEY']
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: '0.8.4',
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999
        }
      }
    },
  },
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: KovanProvider,
      from: KovanProvider.address,
      network_id: '42',
      skipDryRun: true,
      gas: 7900000,
      gasPrice: 100000000000
    },
    live: {
      gas: 7900000,
      provider: MainProvider,
      from: MainProvider.address,
      gasPrice: 2000000000,
      network_id: 1
    }
  }
};