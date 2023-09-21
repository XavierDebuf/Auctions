const Auction = artifacts.require("Auction");
const truffleAssert = require("truffle-assertions");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Auction", (accounts) => {
    /**let auction;
    before(async () => {
      auction = await Auction.deployed(); //this will get the deployed copy of the contract
    });
    describe("deployment and register", async () => {
        it("deploys successfully", async () => {
          const address = await auction.address;
          assert.notEqual(address, 0x0);
          assert.notEqual(address, "");
          assert.notEqual(address, null);
          assert.notEqual(address, undefined);
        });*/
        it("devrait ajouter un enchérisseur correctement", async () => {
          const auctionInstance = await Auction.deployed();
      
          // Adresse de l'enchérisseur à tester
          const bidderAddress = accounts[1];
      
          // Solde de l'enchérisseur
          const bidValue = web3.utils.toWei("1", "ether");
      
          // Appel de la fonction addBidder
          await auctionInstance.addBidder(bidValue, bidderAddress, { from: bidderAddress });
      
          // Vérifier que l'enchérisseur a été ajouté correctement
          const bidderValue = await auctionInstance.getBiddersValue(bidderAddress, { from: bidderAddress });
          const bidderRegister = await auctionInstance.getBiddersRegister(bidderAddress, { from: bidderAddress });
          assert.equal(bidderRegister, true, "L'enchérisseur n'a pas été ajouté correctement.");
          assert.equal(bidderValue, bidValue, "Le solde de l'enchérisseur est incorrect.");
        });
      
        it("devrait générer une erreur si l'enchérisseur est déjà inscrit", async () => {
          const auctionInstance = await Auction.deployed();
      
          // Adresse de l'enchérisseur à tester
          const bidderAddress = accounts[2];
      
          // Solde de l'enchérisseur
          const bidValue = web3.utils.toWei("1", "ether");
      
          // Ajouter l'enchérisseur une première fois
          await auctionInstance.addBidder(bidValue, bidderAddress, { from: bidderAddress });
      
          // Essayer d'ajouter l'enchérisseur une deuxième fois et vérifier l'erreur
          try {
            await auctionInstance.addBidder(bidValue, bidderAddress, { from: bidderAddress });
            assert.fail("La deuxième tentative d'ajout d'enchérisseur aurait dû échouer.");
          } catch (error) {
            assert.include(error.message, "le bidder ne doit pas etre inscrit", "Erreur inattendue.");
          }
        });
          it("devrait retourner le prix courant correspondant à la dernière enchère", async () => {
            const auctionInstance = await Auction.deployed();
            const bidderAddress3 = accounts[3];
            const bidValue3 = web3.utils.toWei("5", "ether");
            await auctionInstance.addBidder(bidValue3, bidderAddress3, { from: bidderAddress3 });
            await auctionInstance.bid(bidValue3,{from: bidderAddress3});
            const bidderValue = await auctionInstance.getBiddersValue(bidderAddress3, { from: bidderAddress3 });
            const currentPrice = await auctionInstance.getCurrentPrice();
            assert.equal(bidderValue, currentPrice, "L'enchérisseur n'a pas enchéri.");
          });
          it("devrait déclencher une exception require si l'encherisseur n'est pas inscrit", async () => {
            const auctionInstance = await Auction.deployed();
            const invalidXValue = accounts[4];
            await truffleAssert.reverts(
              auctionInstance.bid(3,{from: invalidXValue}),
                "le bidder doit etre inscrit"
              );
            });
            it("devrait déclencher une exception require si l'encherisseur qui s'incrit est le propriétaire du contrat", async () => {
              const auctionInstance = await Auction.deployed();
              const bidderAddress0 = accounts[0];
              const bidValue0 = web3.utils.toWei("7", "ether");

              await truffleAssert.reverts(
                auctionInstance.addBidder(bidValue0,bidderAddress0, {from: bidderAddress0}),
                  "le payeur est le proprietaire"
              );
            });
              it("devrait déclencher une validation require si l'encherisseur veut s'incrire dans les temps", async () => {
                const auctionInstance = await Auction.deployed();
                const bidderAddress0 = accounts[4];
                const bidValue0 = web3.utils.toWei("7", "ether");
                
                await truffleAssert.passes(
                  
                  auctionInstance.addBidder(bidValue0,bidderAddress0, {from: bidderAddress0}),
                  "Les inscriptions sont terminees"
                );
               
        });
  });


//describe comes from Mocha framework
