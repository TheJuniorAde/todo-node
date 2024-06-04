"use strict"

module.exports = {
  up: async (queryInterface, _) => {
    return queryInterface.bulkInsert("TodoEntities", [
      {
        name: "pending todo",
        status: "pending",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "finished todo",
        status: "finished",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, _) => {
    return queryInterface.bulkDelete("TodoEntities", null, {})
  },
}
