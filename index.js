const express = require("express");
const { mongoConnect } = require("./services/mongoDb");

//importing app with mounted routes and middleware into serverjs
const { app } = require("./app");

const PORT = 3000;

async function startServer() {
  //wait for mongoDb to connect
  await mongoConnect();

  //starting listening to the server on port 3000
  app.listen(PORT, () => {
    console.log(`\x1b[36m listening on port ${PORT}...\x1b[0m`);
  });
}

startServer();
