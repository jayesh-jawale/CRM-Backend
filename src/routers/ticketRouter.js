const express = require("express");
const router = express.Router();

router.all('/', (req, res) => {
    res.send("Message from ticket Router");
})

module.exports =  router;