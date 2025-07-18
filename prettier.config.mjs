const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  semi: true,
  printWidth: 120,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: "avoid",
  importOrder: [
    "^(react)",
    "<THIRD_PARTY_MODULES>",
    "^app",
    "^pages",
    "^widgets",
    "^features",
    "^entities",
    "^shared",
    "^mocks",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  endOfLine: "auto",
};

export default config;
