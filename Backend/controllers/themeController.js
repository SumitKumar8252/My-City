const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

// Read current theme from file
exports.getTheme = (req, res) => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(data);
    res.json({ theme: db.theme });
  } catch (error) {
    res.status(500).json({ message: "Error reading theme", error });
  }
};

// Update theme in file
exports.updateTheme = (req, res) => {
  try {
    const { theme } = req.body;
    if (!theme) return res.status(400).json({ message: "Theme is required" });

    fs.writeFileSync(dbPath, JSON.stringify({ theme }, null, 2));
    res.json({ message: "Theme updated successfully", theme });
  } catch (error) {
    res.status(500).json({ message: "Error updating theme", error });
  }
};
