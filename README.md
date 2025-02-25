# eslint-plugin-sort-export-all

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

ESLint rule that sorts `exports *` with autofix enabled

![Example](./example.gif)

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

## Rule configuration

- The 1st option is `"asc"` or `"desc"`.

  `"asc"` (default) - enforce properties to be in ascending order.

  `"desc"` - enforce properties to be in descending order.

- The 2nd option is an object which has 3 properties.

  `caseSensitive` - if `true`, enforce properties to be in case-sensitive order. Default is `true`.

  `natural` - if `true`, enforce properties to be in natural order. Default is false. Natural Order compares strings containing a combination of letters and numbers in the way a human being would sort. It basically sorts numerically, instead of sorting alphabetically. So the number 10 comes after the number `3` in Natural Sorting.

  ```
  Standard sorting:   Natural order sorting:
      img1.png            img1.png
      img10.png           img2.png
      img12.png           img10.png
      img2.png            img12.png
  ```

The default config is

```javascript
[
  "warn",
  "asc",
  {
    caseSensitive: true,
    natural: false,
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
