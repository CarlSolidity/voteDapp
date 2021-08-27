const { expect } = require ('chai');
const { ethers } = require('ethers');
const { iteratee } = require('underscore');


describe('OneVote', function() {
    // Deploy the contract and create an instance of it for each tests
    let owner;
    let addr1;
    let addr2;
    let addrs;
    Names = ['Joe', 'Don'];

    beforeEach(async function() {
        this.OneVote = await ethers.getContractFactory('OneVote');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        this.onevote = await this.OneVote.deploy();
        await this.onevote.deployed();
    });

    // Tests

    describe('Deployment', function() {
        it("Deploy and create the proposals from the names", async function () {
            
        })
    })
})