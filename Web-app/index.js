const express = require('express');
const cors = require('cors');
const app = express();
// const router = express.Router();
const file = require('../Parser/companys.json');

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("", async (req, res) => {
    console.log("trying to send data");
    res.json(file);
});





app.listen(process.env.PORT || 3001, () => {
    console.log("server running on 'port 3001");

});

