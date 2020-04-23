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
})