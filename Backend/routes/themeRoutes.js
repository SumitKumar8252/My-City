const express = require("express");
const { getTheme, updateTheme } = require("../controllers/themeController");

const router = express.Router();

// GET current theme
router.get("/", getTheme);

// PUT to update theme
router.put("/", updateTheme);

module.exports = router;
