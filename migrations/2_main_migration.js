const InfinityPadToken = artifacts.require('InfinityPadToken');

module.exports = async (deployer) => {
  await deployer.deploy(InfinityPadToken, 'Infinity Pad Token', 'iPad', '1000000000000000000000000000');
}