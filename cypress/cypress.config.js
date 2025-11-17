const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // ✅ your running dev server
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotsFolder: "cypress/screenshots",
  },
});
