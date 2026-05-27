import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";

export default tseslint.config(
  {
    ignores: ["lib/**/*", "generated/**/*"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
      },
    },
    plugins: {
      import: pluginImport,
    },
    extends: [...tseslint.configs.recommended],
    rules: {
      quotes: ["error", "double"],
      "import/no-unresolved": 0,
      indent: ["error", 2],
    },
  }
);
