// eslint.config.js
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,
  reactHooks.configs.recommended,
  reactRefresh.configs.recommended,
  {
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
