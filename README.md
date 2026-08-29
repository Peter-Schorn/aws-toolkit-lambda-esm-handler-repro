# AWS Toolkit Lambda ESM Handler Reproduction

This project reproduces an AWS Toolkit for VS Code Explorer error for a valid
Node.js ESM Lambda package.

The generated deployment ZIP contains `index.js` at its root and a root
`package.json` with `"type": "module"`. The Lambda handler is
`index.handler`.

## Prerequisites

- Node.js 24 or later
- AWS CLI authenticated for the target account and region
- An existing Node.js 24 Lambda function

## Package

```sh
npm install
npm run package
unzip -l lambda.zip
```

The archive must contain `index.js` and `package.json`. It deliberately does
not contain `index.mjs`.

## Deploy

Set the existing Lambda function name, then deploy:

```sh
FUNCTION_NAME=aws-toolkit-esm-repro npm run deploy
```

The script uploads `lambda.zip` and configures the function with:

- Runtime: `nodejs24.x`
- Handler: `index.handler`

Invoke the function through the Lambda console to verify it succeeds.

## AWS Toolkit Failure

In VS Code with AWS Toolkit 4.15.0, expand the deployed function in the AWS
Explorer. The Toolkit downloads the function, then reports:

```text
Handler file /tmp/aws-toolkit-vscode/lambda/<region>/<function>/index.mjs not found in downloaded function.
```

`index.handler` is valid because Node resolves `index.js` as ESM from the
package's `"type": "module"` declaration. Lambda invokes the function
successfully; only the Toolkit's local download/Explorer workflow fails.
