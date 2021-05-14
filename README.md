# husky commitizen lab

🧪 A repo built for trying workflows using husky and commitizen

## Usage
```cmd
yarn
```

After any kinds of modify
```cmd
git add .
```
Now you should use
```cmd
git-cz
``` 
to commit your changes.

If your commit messages can't pass the commitlint, you can't continue your commitment.

## Working with sourcetree (or other GUI git tool)

GUI tool may prompt `yarn: command is not found`
please save this to `~`
> .huskyrc
```bash
# .huskyrc
export PATH="/usr/local/bin/:$PATH"
```

## How this work?

## 1. 🦾 Install commitlint

```cmd
yarn add --dev @commitlint/cli @commitlint/config-angular cz-conventional-changelog
```

## 2. 📃 Add commitlint.config.js
```js
module.exports = {
    extends: ['@commitlint/config-angular']
};
```

## 3. 🐶 Install husky

```cmd
yarn add --dev husky
yarn husky init
```

## 4. ⚡️ package.json

```json
"scripts": {
    "commit": "git-cz",
    "prepare": "husky install",
    "test": "commitlint --edit $1"
  },
```

## 5. ⚙️ husky config
> .husky/commit-msg
```bash
yarn test
```
