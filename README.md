# trustshare examples
A collection of examples using the trustshare api and sdks.

We will aim to provide multiple examples of how to use the trustshare api and sdks., with different tech stacks. 

Please let us know if you have any questions or suggestions.

## Dependencies
To install all dependencies, in the root of the project run

```bash
yarn
``` 
If you dont want to use yarn workspaces, you can use the following command in the separate folders:

```bash
npm install
```

## Workspaces
The different examples are managed by [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). Different examples can be run using the following command:

```bash
yarn workspace ${workspace_name} dev
```
for example

```bash
yarn workspace @examples/basic-checkout dev
```

Alternatively, you can change directory into each example and run them for that directory using

```bash
npm run dev
```

## StackBlitz
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/trustshare/examples?file=readme.md)

When running the examples in StackBlitz, we recommend using google chrome to test. Other browsers may not work.

## Readme
Each example has a readme file, which contains instructions on how to run the example. Each example will need API keys to run. 

## Questions / Improvements
Please let us know if you have any questions or suggestions. We're happy to help.

<!-- TODD:  -->

Link to the examples