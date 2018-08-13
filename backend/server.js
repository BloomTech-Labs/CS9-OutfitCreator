const express = require('express');
const port = 5000;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})