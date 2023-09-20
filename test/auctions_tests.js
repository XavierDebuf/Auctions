const auctionsTests = artifacts.require("../contracts/Auction.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("auctionsTests", function () {
  it("should assert address", async function () {
   const auction = await auctionsTests.deployed();
   console.log(auction.address)
   assert(auction.address != "" && auction.address!=undefined)
  });
  //it("should assert auction registered ok") async function(){
  //  await auctionsTests.
 // }
});
