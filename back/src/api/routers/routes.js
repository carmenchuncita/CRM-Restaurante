const express = require('express');
const router = express.Router();

router.use("/users", require("./api_routes/user.routes"));
router.use("/menu", require("./api_routes/menu.routes"));
router.use("/mesa", require("./api_routes/mesa.routes"))

module.exports = router;