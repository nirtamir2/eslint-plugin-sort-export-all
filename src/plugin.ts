import type { ESLint } from "eslint";
import { name, version } from "../package.json";
import sortExportAll from "./rules/sort-export-all";

export const plugin = {
  meta: {
    name,
    version,
  },
  // @keep-sorted
  rules: {
    "default-import-name": sortExportAll,
  },
} satisfies ESLint.Plugin;
