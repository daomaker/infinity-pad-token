require('dotenv').config();

const LedgerWalletProvider = require('@ledgerhq/web3-subprovider');
const createLedgerSubprovider = LedgerWalletProvider.default;
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid-singleton').default;
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
const logger = require("@ledgerhq/logs");

logger.listen(log => console.log(log.type + ": " + log.message));

const kovanRpcUrl = `https://kovan.infura.io/v3/${process.env['INFURA_KEY']}`;
const mainnetRpcUrl = `https://mainnet.infura.io/v3/${process.env['INFURA_KEY']}`;

function ledgerSubprovider(networkId, rpcUrl) {
  const getTransport = () => TransportNodeHid.create();
  const ledger = createLedgerSubprovider(getTransport, {
    networkId: networkId,
    askConfirm: false,
  });

  const engine = new ProviderEngine();
  engine.addProvider(ledger);
  engine.addProvider(new RpcSubprovider({ rpcUrl }));
  engine.start();

  return engine;
}

//NOTE: Don't specify gasPrice parameter. Code will fail with "Web3ProviderEngine does not support synchronous requests" error
module.exports = {
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
      host: "localhost",
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: ledgerSubprovider(42, kovanRpcUrl),
      network_id: 42,
      from: process.env['DEPLOYER_ADDRESS'],
      skipDryRun: true,
      gas: 7900000,
    },
    live: {
      provider: ledgerSubprovider(1, mainnetRpcUrl),
      network_id: 1,
      from: process.env['DEPLOYER_ADDRESS'],
      skipDryRun: true,
      gas: 7900000,
    }
  }
};
