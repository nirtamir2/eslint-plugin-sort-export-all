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
      output: js`
        export * from "./a";
        export * from "./b";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./a",
            afterName: "./b",
          },
        },
      ],
    },
    {
      code: js`
        export * from "./b";
        export * from "./a";
        export * from "./c";
      `,
      output: js`
        export * from "./a";
        export * from "./b";
        export * from "./c";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./a",
            afterName: "./b",
          },
        },
      ],
    },
    {
      code: js`
        export * from "./a";
        export * from "./c";
        export * from "./b";
      `,
      output: js`
        export * from "./a";
        export * from "./b";
        export * from "./c";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./b",
            afterName: "./c",
          },
        },
      ],
    },
    {
      code: js`
        export * from "./ca/cb";
        export * from "./a";
      `,
      output: js`
        export * from "./a";
        export * from "./ca/cb";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./a",
            afterName: "./ca/cb",
          },
        },
      ],
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
      output: ts`
        export * from "./constants";
        export type * from "./types";
        export * from "./utils";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./constants",
            afterName: "./utils",
          },
        },
      ],
    },
    {
      name: "should handle duplicate names",
      code: ts`
        export * from "./b";
        export * from "./a";
        export * from "./b";
      `,

      output: ts`
        export * from "./a";
        export * from "./b";
        export * from "./b";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./a",
            afterName: "./b",
          },
        },
      ],
    },
    {
      name: "should handle duplicate names (issue)",
      code: ts`
        export * from "./lib/ticker-wat/Wat";
        export * from "./lib/sticky-wat/Wat";
        export * from "./lib/client-wat/Wat";
        export * from "./lib/custom-wat/Wat";
        export * from "./lib/rules-wat/Wat";
        export * from "./lib/send-wat/Wat";
        export * from "./assets/timezone";
        export * from "./hooks/useWat";
        export * from "./lib/avatar/Avatar";
      `,

      output: ts`
        export * from "./assets/timezone";
        export * from "./hooks/useWat";
        export * from "./lib/avatar/Avatar";
        export * from "./lib/client-wat/Wat";
        export * from "./lib/custom-wat/Wat";
        export * from "./lib/rules-wat/Wat";
        export * from "./lib/send-wat/Wat";
        export * from "./lib/sticky-wat/Wat";
        export * from "./lib/ticker-wat/Wat";
      `,
    },
    {
      name: "should handle multiple fixes",
      code: ts`
        export * from "./c";
        export * from "./b";
        export * from "./a";
      `,

      output: ts`
        export * from "./a";
        export * from "./b";
        export * from "./c";
      `,
      errors: [
        {
          messageId: "unorderedSortExportAll",
          data: {
            beforeName: "./a",
            afterName: "./c",
          },
        },
      ],
    },
    // {
    //   name: "should handle comment",
    //   code: ts`
    //     // This is C
    //     export * from "./c";
    //     export * from "./b";
    //     export * from "./a";
    //   `,
    //   output: ts`
    //     export * from "./a";
    //     export * from "./b";
    //     // This is C
    //     export * from "./c";
    //   `,
    // },
  ],
});
