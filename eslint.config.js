import nirtamir2 from "@nirtamir2/eslint-config";

export default nirtamir2(
  {
    type: "lib",
  },
  [
    {
      ignores: ["vendor"],
    },
    {
      rules: {
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/no-empty-test-file": "off",
        "unicorn/no-array-push-push": "off",
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  ],
).removeRules(["unicorn/no-empty-file"]);
// replace local config
// .onResolved((configs) => {
//   configs.forEach((config) => {
//     if (config?.plugins?.antfu) config.plugins.antfu = local;
//   });
// });
