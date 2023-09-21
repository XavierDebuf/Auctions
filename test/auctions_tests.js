const Auction = artifacts.require("Auction");

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
      });


//describe comes from Mocha framework
