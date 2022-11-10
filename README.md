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

## Examples

### [Basic Checkout](/examples/basic-checkout)
The basic checkout example sets up a payment intent on the server side. The intent is then consumed by the client to open the trustshare checkout. It uses an example of a shopping cart, where items are passed in to the intent.

### [Direct Checkout](/examples/direct-checkout)
A direct checkout facilitates a payment between 2 parties. The example sets up a payment intent on the server side, which is then consumed by the client to open the trustshare direct checkout.

### [Payment Link](/examples/payment-link)
A payment link Payment Intent provisions a short, shareable link that can be used to direct your users to pay. It offers the same settlement mechanism as other Payment Intents and therefore can describe a checkout to many sellers from a single buyer.

### [Invoice](/examples/invoice)
An invoice Payment Intent provisions an invoice, to be fulfilled now or in the future. It offers the same mechanism to describe settlements to multiple sellers from a single buyer.

An invoice Payment Intent requires a "controlled" Project to be created up front via the Create Project endpoint. You can find more information on Projects [here](https://docs.trustshare.io/guides/projects).

An invoice intent still requires confirmation by a user via the Client SDK, however no UI will be displayed to the user. Here, we show an example of how an invoice can be handled by once it has been created.

### [Expo](/examples/expo/)
The expo example shows an integration path for React Native users.
The example uses our package [@trustshare/react-native-sdk](https://www.npmjs.com/package/@trustshare/react-native-sdk) as a convenient way to implement a checkout or verification flow. 

### [Verification](/examples/verification)
The verification example creates a verification for a user. trustshare offers facilities for verifying the identities and carrying out due diligence on customers which transact on the platform.

### [Multiple Participants In a Single Project](/examples/multiple-participants-single-project)
The system allows you to take control of projects by creating them up front. These are known as 'controlled' project. This example shows how a controlled project can be used to define a payment flow with multiple participants all paying into the same project. 

Controlled project are very powerful and unlock many different flows. For example, you could issue a Project for a repeat buyer on your system so they have a consistent set of account credentials to pay into.