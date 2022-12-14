const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const PORT = 4000;

const server = express();

server.use(cors());
server.use(helmet());

server.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));