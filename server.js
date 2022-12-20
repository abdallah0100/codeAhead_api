const express = require('express');
const cors = require("cors");
const helmet = require("helmet");

const router = require('./src/router');

const PORT = 4000;
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api", router);

server.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));