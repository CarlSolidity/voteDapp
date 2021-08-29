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
        })

    })

    
})