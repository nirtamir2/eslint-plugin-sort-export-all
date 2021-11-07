module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    "no-restricted-syntax": 0,
    "import/prefer-default-export": 0,
    "import/order": [
      "error",
      { alphabetize: { order: "asc", caseInsensitive: true } },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
        mjs: "never",
      },
    ],
    // Unable to resolve path to module 'estree'
    "import/no-unresolved": 0,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
