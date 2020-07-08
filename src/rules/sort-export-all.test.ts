import { RuleTester } from "eslint";

import rule from "./sort-export-all";

const tester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

tester.run("sort-export-all", rule, {
  valid: [
    {
      code: `
      export * from "./a";
      export * from "./b";
    `,
    },
  ],
  invalid: [
    {
      code: `
      export * from "./b";
      export * from "./a";
    `,
      errors: [
        {
          message:
            "Expected export * order to be in asc. './a' should be before './b'.",
        },
      ],
      output: `
      export * from "./a";
      export * from "./b";
    `,
    },
  ],
});
