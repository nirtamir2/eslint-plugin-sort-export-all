# eslint-plugin-sort-export-all

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

ESLint rule that sorts `exports *` with autofix enabled

![Example](docs/sort-export-all.gif)

[Rules List](./src/rules)

## Configuration

```shell
pnpm add -D eslint-plugin-sort-export-all
```

Add to your `eslint.config.js`

```js
import sortExportAllConfig from "eslint-plugin-sort-export-all/config";

export default [sortExportAllConfig()];
```

Or configure the plugin manually

```js
import eslintPluginSortExportAll from "eslint-plugin-sort-export-all";

export default [
  {
    plugins: {
      "sort-export-all": eslintPluginSortExportAll,
    },
    rules: {
      "sort-export-all/sort-export-all": "warn",
    },
  },
];
```

## License

[MIT](./LICENSE) License © 2020-PRESENT [Nir Tamir](https://github.com/nirtamir2)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/eslint-plugin-sort-export-all?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-plugin-sort-export-all
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-plugin-sort-export-all?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-plugin-sort-export-all
