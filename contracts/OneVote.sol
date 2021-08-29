// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

// Inspired by solidity docs
contract OneVote {
    
    // characteristics of a voter
    struct Voters {
        uint weight; //used to determine if the address can vote
        bool voted; // Check if voted already or not
        uint vote;
    }

    // proposals
    struct Proposal {
        bytes32 name;
        uint voteCount; // how many votes received
    }

    address public _owner;

    // mapping of address to associate characteristics to an address
    mapping(address => Voters) public voters;

    Proposal[] public proposals;
    uint public propCount;

    modifier isOwner() {
        require(msg.sender == _owner, "Only the owner can use this function");
        _;
    }

    // Feed an array to the constructor and it creates as 
    // many proposal object as candidates named in the array
    constructor(bytes32[] memory proposalNames) {
        propCount = 0;
        _owner = msg.sender;
        voters[_owner].weight = 1;
        console.log("Number of candidates: %s", proposalNames.length);
        //for (uint i=0; i<=proposalNames.length; i++) {
            //console.log("Adding candidate: %s", proposalNames);
            //storeProposal(proposalNames[i]);
            //console.log("The proposal number %s was made",i);
            //console.log("PropCount: %s", propCount);
            //propCount++;
            
            //}
            //propCount--;
        for (uint i=0; i<proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount:0
            }));
            propCount++;
            console.log("The proposal number %s was made",propCount);
        }
    }

    function storeProposal(bytes32 _Name) private {
        // doesnt work with dynamic array, cant access [propCount] before creating it
        //console.log("Now pushing the candidate %s", _Name);
        proposals.push(Proposal({
            name: _Name,
            voteCount: 0
        }));
        //propCount++;
    }
    

    // One transaction needed for each time you add a voting address
    function giveRightToVote(address voter) public isOwner {
        require(!voters[voter].voted, "This address already voted");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;        
    }

    // Cast a vote if requirements are met
    function vote(uint proposal) public {
        Voters storage sender = voters[msg.sender];
        require(sender.weight !=0, "No right to vote");
        require(!sender.voted, "This address already voted");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;

    }

    // Computes the winner of the votes (most votes for the proposal)
    // Does not take equal winners in account.
    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for(uint p=0; p<proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // returns the name of the winning proposal
    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

    function getStruct() public view returns (Proposal[] memory) {
        Proposal[] memory prrops = new Proposal[](propCount);
        for (uint j=0; j < propCount; j++) {
            Proposal storage prrop = proposals[j];
            prrops[j] = prrop;
        }
        return prrops;
        
    }

    function getNames() public view returns (bytes32[] memory) {
        Proposal[] memory prrops = new Proposal[](propCount);
        // Have to declare the bytes32 array like this in order to access
        // by index (line 127) otherwise get out of bound error.
        bytes32[] memory Candidates = new bytes32[](proposals.length);
        for (uint j=0; j < propCount; j++) {
            Proposal storage prrop = proposals[j];
            prrops[j] = prrop;
            Candidates[j] = prrop.name;
        }
        return Candidates;
    }

}
    