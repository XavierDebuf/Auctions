var Auctions = artifacts.require ("../contracts/Auction.sol");

module.exports = function(_deployer) {
  
  _deployer.deploy (Auctions);// Use deployer to state migration tasks.
};
