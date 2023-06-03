const express = require("express");

//importing app with mounted routes and middleware into serverjs
const { app } = require("./app");

const PORT = 3000;

//starting listening to the server on port 3000
app.listen(PORT, () => {
  console.log(`\x1b[36m listening on port ${PORT}...\x1b[0m`);
});
