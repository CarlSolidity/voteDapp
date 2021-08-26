// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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

}