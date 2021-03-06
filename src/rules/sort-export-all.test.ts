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
      code: `
      export * from "./BackgroundGradientImage";
      export * from "./Fab";
      export * from "./variables/colors";
      export * from "./variables/dimensions";`,
    },
    {
      code: `
      export * from "./BackgroundGradientImage";
      export * from "./Fab";
      export * from "./variables/colors";
      export * from "./variables/dimensions";`,
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
            "\"export * from './a'\" should occur before \"export * from './b'\".",
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
            "\"export * from './a'\" should occur before \"export * from './b'\".",
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
            "\"export * from './b'\" should occur before \"export * from './c'\".",
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
            "\"export * from './a'\" should occur before \"export * from './ca/cb'\".",
        },
      ],
      output: `
      export * from "./a";
      export * from "./ca/cb";
    `,
    },
  ],
});
