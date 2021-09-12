// cluster std package
process.env.UV_THREADPOOL_SIZE = 1
const cluster = require("cluster");

// is file being executed in master mode?
// true for the cluster manager (main instance),
// false for other instance created form cluster.fork
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  // KEEP THE COUNT OF CHILDREN EQUAL TO THE COUNT OF PHYSICAL CORES IN CPU 
  // OR LOGICAL CORES
  cluster.fork();
  cluster.fork()

} else {
  // i am a child, i am going to act like a server and do nothing else
  const express = require("express");
  const app = express(); 
  const crypto = require("crypto");

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("hi there");
    });
  });
  app.get("/fast", (req, res) => {
    res.send("This was fase");
  });

  app.listen(3000);
}
