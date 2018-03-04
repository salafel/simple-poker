const assert = require('assert')
const { reset, game, handleCommand } = require('../src/actions')

describe("actions", () => {

  it("adds players", () => {
    reset()
    handleCommand("add salah")
    assert.deepEqual(game.players[0].name,"salah")
  })
})
