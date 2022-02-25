module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
