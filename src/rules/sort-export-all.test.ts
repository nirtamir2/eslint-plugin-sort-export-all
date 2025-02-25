import tsParser from "@typescript-eslint/parser";
import { any as js } from "code-tag";
import rule, { RULE_NAME } from "./sort-export-all";
import { run } from "./_test";

run({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
  name: RULE_NAME,
  rule,
  valid: [
    {
      code: js`
        export * from "./a";
        export * from "./b";
      `,
    },
    {
      code: js`
        export * from "./BackgroundGradientImage";
        export * from "./Fab";
        export * from "./variables/colors";
        export * from "./variables/dimensions";
      `,
    },
    {
      code: js`
        export * from "./BackgroundGradientImage";
        export * from "./Fab";
        export * from "./variables/colors";
        export * from "./variables/dimensions";
      `,
    },
  ],
  invalid: [
    {
      code: js`
        export * from "./b";
        export * from "./a";
      `,
      errors: [
        {
          message:
            "\"export * from './a'\" should occur before \"export * from './b'\".",
        },
      ],
      output: js`
        export * from "./a";
        export * from "./b";
      `,
    },
    {
      code: js`
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
      output: js`
        export * from "./a";
        export * from "./b";
        export * from "./c";
      `,
    },
    {
      code: js`
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
      output: js`
        export * from "./a";
        export * from "./b";
        export * from "./c";
      `,
    },
    {
      code: js`
        export * from "./ca/cb";
        export * from "./a";
      `,
      errors: [
        {
          message:
            "\"export * from './a'\" should occur before \"export * from './ca/cb'\".",
        },
      ],
      output: js`
        export * from "./a";
        export * from "./ca/cb";
      `,
    },
  ],
});

const ts = js;

run({
  name: RULE_NAME,
  rule,
  languageOptions: {
    parser: tsParser,
  },
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
  valid: [
    {
      code: ts`
        export * from "./constants";
        export type * from "./types";
        export * from "./utils";
      `,
    },
  ],
  invalid: [
    {
      code: ts`
        export * from "./utils";
        export type * from "./types";
        export * from "./constants";
      `,
      errors: [
        {
          message:
            "\"export * from './constants'\" should occur before \"export * from './utils'\".",
        },
      ],
      output: ts`
        export * from "./constants";
        export type * from "./types";
        export * from "./utils";
      `,
    },
  ],
});
