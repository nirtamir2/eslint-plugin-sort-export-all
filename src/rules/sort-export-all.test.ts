import { RuleTester } from "eslint";

import { sortExportAll } from "./sort-export-all";

const tester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

tester.run("sort-export-all", sortExportAll, {
  valid: [
    {
      code: `
      export * from "./a";
      export * from "./b";
    `,
    },
    {
      code: `export * from "./BackgroundGradientImage";
export * from "./Fab";
export * from "./variables/colors";
export * from "./variables/dimensions";
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
    {
      code: `
      export * from "./b";
      export * from "./a";
      export * from "./c";
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
      export * from "./c";
    `,
    },
    {
      code: `
      export * from "./a";
      export * from "./c";
      export * from "./b";
    `,
      errors: [
        {
          message:
            "Expected export * order to be in asc. './b' should be before './c'.",
        },
      ],
      output: `
      export * from "./a";
      export * from "./b";
      export * from "./c";
    `,
    },
    {
      code: `
      export * from "./ca/cb";
      export * from "./a";
    `,
      errors: [
        {
          message:
            "Expected export * order to be in asc. './a' should be before './ca/cb'.",
        },
      ],
      output: `
      export * from "./a";
      export * from "./ca/cb";
    `,
    },
    {
      code: `
      export * from "./ca/cb";
      export * from "./a";
    `,
      errors: [
        {
          message:
            "Expected export * order to be in asc. './a' should be before './ca/cb'.",
        },
      ],
      output: `
      export * from "./a";
      export * from "./ca/cb";
    `,
    },
  ],
});
