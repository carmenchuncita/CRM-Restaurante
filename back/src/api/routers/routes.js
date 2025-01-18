const express = require('express');
const router = express.Router();

router.use("/users", require("./api_routes/user.routes"));
router.use("/sports", require("./api_routes/sport.routes"));

module.exports = router;