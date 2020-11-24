import { recommended } from "./config/recommended";
import { sortExportAll } from "./rules/sort-export-all";

module.exports = {
  rules: {
    "sort-export-all": sortExportAll,
  },
  configs: {
    recommended,
  },
};
