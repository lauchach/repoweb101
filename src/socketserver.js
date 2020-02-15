const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.render("Chatroom.ejs");
});

const server = http.listen(3000, function() {
  // eslint-disable-next-line no-console
  console.log("listening on :3000");
});

// Vue.use(server,io)
