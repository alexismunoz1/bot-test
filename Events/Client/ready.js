const { loadCommnads } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Client ready");
    loadCommnads(client);
  },
};
