# AWS Toolkit Lambda ESM Handler Reproduction

This project reproduces an AWS Toolkit for VS Code Explorer stale cache error.
The function must first be downloaded by the Toolkit while its package contains
`index.mjs`, then redeployed with `index.js`.

## Prerequisites

- Node.js 24 or later
- AWS CLI authenticated for the target account and region
- An existing Node.js 24 Lambda function

## Reproduction

```sh
npm install
FUNCTION_NAME=aws-toolkit-esm-repro npm run deploy:mjs
```

In AWS Toolkit Explorer, expand the function so the Toolkit downloads its
`index.mjs` package. Then redeploy the same function:

```sh
FUNCTION_NAME=aws-toolkit-esm-repro npm run deploy:js
```

Refresh or expand the function in AWS Toolkit Explorer. Toolkit 4.15.0 can
continue looking for the old `index.mjs` path and report:

```text
Handler file /tmp/aws-toolkit-vscode/lambda/<region>/<function>/index.mjs not found in downloaded function.
```

The generated ZIPs are intentionally distinct:

- `npm run package:mjs` contains root `index.mjs` and `package.json`.
- `npm run package:js` contains root `index.js` and `package.json`.

Neither command includes the other entry-file extension because `npm run build`
removes the previous build directory and ZIP first.

## Function Configuration

Create the function with the `nodejs24.x` runtime and handler `index.handler`.
The root `package.json` declares `"type": "module"`, so Lambda correctly
invokes either entry-file extension. The function continues to run after the
second deployment; the failure is limited to the Toolkit's local cache.
