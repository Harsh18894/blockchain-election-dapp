pragma solidity ^0.5.0;


contract Election {
    // Model a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Store Candidates
    mapping(uint256 => Candidate) public candidates;
    // Fetch Candidates
    // Store Candidates Count
    uint256 public candidatesCount;

    constructor() public {
        addCandidate("John Doe");
        addCandidate("Jane Doe");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
