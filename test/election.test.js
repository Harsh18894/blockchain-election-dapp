var Election = artifacts.require("./Election.sol")

contract("Election", (accounts) => {

    let election

    before(async () => {
        election = await Election.deployed()
    })

    describe('deployment', async () => {
        it("initializes with two candidates", async () => {
            const candidatesCount = await election.candidatesCount()

            assert.equal(candidatesCount, 2)
        })

        it('candidates initialized with corect values', async () => {
            const candidateOne = await election.candidates(1)
            const candidateTwo = await election.candidates(2)
            assert.equal(candidateOne[0], 1, "john contains the correct id")
            assert.equal(candidateOne[1], 'John Doe', "Name is correct")
            assert.equal(candidateOne[2], 0, "vote count is correct")
            assert.equal(candidateTwo[0], 2, "jane contains the correct id")
            assert.equal(candidateTwo[1], 'Jane Doe', "Name is correct")
            assert.equal(candidateTwo[2], 0, "vote count is correct")
        })
    })

    describe('voting', async () => {
        let vote, candidateId = 1

        before(async () => {
            vote = await election.vote(candidateId, { from: accounts[0] })
        })

        it('allows a voter to cast a vote', async () => {
            assert.equal(vote.logs.length, 1, "an event was triggered")
            assert.equal(vote.logs[0].event, "votedEvent", "the event type is correct")
            assert.equal(vote.logs[0].args._candidateId.toNumber(), 1, "the candidateId is correct")
        })

        it('voter was marked as voted', async () => {
            const voted = await election.candidates(1)
            assert(voted, 'voter was marked as voted')
        })
        it('vote count was incremented', async () => {
            const candidate = await election.candidates(candidateId)
            const voteCount = candidate[2]
            assert.equal(voteCount, 1, "increments the candidate's vote count")
        })
    })

    describe('throws an exception for invalid candidates', async () => {

    })

    describe('throws an exception for double voting', async () => {

    })
})