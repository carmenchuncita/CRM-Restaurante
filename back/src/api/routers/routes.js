const express = require('express');
const router = express.Router();

router.use("/mesa", require("./api_routes/mesa.routes"));
router.use("/menu", require("./api_routes/menu.routes"));

module.exports = router;