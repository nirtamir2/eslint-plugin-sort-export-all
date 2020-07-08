# eslint-plugin-sort-export-all

ESLint rule that sorts `exports *` with autofix enabled

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-export-all`:

```
$ npm install eslint-plugin-sort-export-all --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-sort-export-all` globally.

## Usage

Add `sort-export-all` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["sort-export-all"]
}
```

Then add sort-export-all rule under the rules section.

```json
{
  "rules": {
    "sort-export-all/sort-export-all": "warn"
  }
}
```

Often it makes sense to enable `sort-export-all` only for certain files/directories. For cases like that, use override key of eslint config:

```jsonc
{
  "rules": {
    // ...
  },
  "overrides": [
    {
      "files": ["src/alphabetical.js", "bin/*.js", "lib/*.js"],
      "rules": {
        "sort-export-all/sort-export-all": "warn"
      }
    }
  ]
}
```

## Rule configuration

For available config options, see [official sort-keys reference](https://eslint.org/docs/rules/sort-keys#require-object-keys-to-be-sorted-sort-keys). All options supported by `sort-keys`, besides `minKeys`, are supported by `sort-export-all`.
