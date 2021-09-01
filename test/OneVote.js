const { expect } = require ('chai');
//const { ethers } = require('ethers');
//const { iteratee } = require('underscore');


describe('OneVote', function() {
    // Deploy the contract and create an instance of it for each tests
    let owner;
    let addr1;
    let addr2;
    let addrs;
    J = ethers.utils.formatBytes32String('Joe');
    D = ethers.utils.formatBytes32String('Don');
    X = ethers.utils.formatBytes32String('Xavier');
    O = ethers.utils.formatBytes32String('Oliver');
    Names = [J, D, X, O];
    let x = [];

    beforeEach(async function() {
        this.OneVote = await ethers.getContractFactory('OneVote');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        this.onevote = await this.OneVote.deploy(Names);
        await this.onevote.deployed();
    });

    // Tests

    describe('Deployment', function() {
        it("Deploy and create the proposals from the names", async function () {
            
        });

        it("Owner is the contract creator", async function () {
            expect(await this.onevote._owner()).to.equal(await owner.address);
        });

        it("Verify the names of the proposal", async function () {
            var x = await this.onevote.getNames.call();
            
            console.log("Candidate input is: %s", Names);
            console.log("array of struct is: %s", x);
        // This test compares the two arrays of names (Candidates names fed to the constructor
        // and an array of the candidates names created in the smart contract post deployment)
        // .toString() is needed to compare the values as array comparison needs deep equal otherwise.
           expect((await this.onevote.getNames.call()).toString()).to.equal(Names.toString());
        });

    });

    describe('Add voters', function () {
        it("Add several voters at once, vote with 3 addresses, winner should be X", async function () {
            console.log("addr1 = %s", addr1);
            console.log("addr2 = %s", addr2);
            await this.onevote.approveManyVoters([addr1.address, addr2.address]);
            await this.onevote.connect(addr1).vote(2);
            await this.onevote.vote(2);
            await this.onevote.connect(addr2).vote(1);

            var proposals = await this.onevote.getStruct.call();
            for (let i = 0; i < proposals.length; i++) {
                console.log("the votes for %s are: %s",i, proposals[i].voteCount);
            }

            var winner = await this.onevote.winnerName.call()
            //console.log("Winner is %s", winner.toString());
            expect(await winner.toString()).to.equal(X.toString());
            
        });

        it("Try to vote unapproved.", async function() {
            await expect(this.onevote.connect(addr1).vote(1)).to.be.revertedWith("No right to vote");
        });

        it("Try to vote twice", async function() {
            await this.onevote.approveManyVoters([addr1.address, addr2.address]);
            await this.onevote.connect(addr1).vote(2);
            await expect(this.onevote.connect(addr1).vote(1)).to.be.revertedWith("This address already voted");
        })
    });

    
})