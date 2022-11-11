<p align="center">
  <br/>
  <img width="400px" src="https://assets.staging.trustshare.io/trustshare-logo.png">
  <br/>
  <br/>
  <strong>Example Integrations</strong>
  <br/>
  <i>Simple borderless payments infrastructure for marketplaces.</i>
  <br/>
  Embedded fintech done right - whether that's escrow, credit, banking or payments.
  <br/>
  Design your payment flow with our borderless API.
  <br/>
  <br/>
  <span>
    <a href="https://trustshare.co" target="_blank">Home</a>
    <span> | </span>
    <a href="https://docs.trustshare.io" target="_blank">Documentation</a>
    <span> | </span>
    <a href="https://dashboard.trustshare.io" target="_blank">Dashboard</a>
  </span>
</p>

## 📖 Documentation

See our in-depth [documentation](https://docs.trustshare.io/guides/getting-started) to learn more about how you can integrate with our platform.

## 🚀 Quick start

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/trustshare/examples?file=readme.md)

To make the most of these examples, you will need to sign up or log in to the [dashboard](https://dashboard.trustshare.io/) to acquire a **private API key** used to instantiate the API client. You can use our handy [getting started](https://docs.trustshare.io/guides/getting-started) guide that describes setting up your organisation on the [dashboard](https://dashboard.trustshare.io/).

This repository comprises multiple examples of integration approaches for specific use-cases of the trustshare API. To get started, clone the repository and use yarn to install the required dependencies:

```bash
yarn
```

**N.B.** This repository leverages [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). All commands should be run from the root.

## 🌳 Environment Variables

Each example needs your trustshare API keys to run.

Rename the `.env.example.js` file to `.env.js` and fill in the API keys for the string values.

This file is used to load each projects environment with your API keys.

## 👨🏽‍🍳 Recipes

The following recipes provide a glimpse into simple integrations using the trustshare API. For more in-depth support please refer to your Slack developer support channel.

<table>
  <tr>
    <td>
      <h3>🛒 Basic Checkout</h3>
      <p>The basic checkout example sets up a payment intent on the server side. The intent is then consumed by the client to open the trustshare checkout. It uses an example of a shopping cart, where items are passed in to the intent.</p>
    </td>
    <td><a href="/examples/basic-checkout">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <p>
      <h3>🔗 Payment Link</h3>
      <p>A payment link Payment Intent provisions a short, shareable link that can be used to direct your users to pay. It offers the same settlement mechanism as other Payment Intents and therefore can describe a checkout to many sellers from a single buyer.</p>
    </td>
    <td><a href="/examples/payment-link">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <h3>🧾 Invoice</h3>
      <p>An invoice Payment Intent provisions an invoice, to be fulfilled now or in the future. It offers the same mechanism to describe settlements to multiple sellers from a single buyer.<br/><br/>An invoice Payment Intent requires a "controlled" Project to be created up front via the Create Project endpoint. You can find more information on Projects <a href="https://docs.trustshare.io/guides/projects">here</a></p><p>An invoice intent still requires confirmation by a user via the Client SDK, however no UI will be displayed to the user. Here, we show an example of how an invoice can be handled by once it has been created.</p>
    </td>
    <td><a href="/examples/invoice">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <h3>📱 React Native</h3>
      <p>The expo example shows an integration path for React Native users. The example uses our package <a href="https://www.npmjs.com/package/@trustshare/react-native-sdk">@trustshare/react-native-sdk</a> as a convenient way to implement a checkout or verification flow.</p>
    </td>
    <td><a href="/examples/expo">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <h3>🙋‍♂️ Verification</h3>
      <p>The verification example creates a verification for a user. trustshare offers facilities for verifying the identities and carrying out due diligence on customers which transact on the platform.</p>
    </td>
    <td><a href="/examples/verification">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <h3>👨‍👩‍👧 Multiple Participants In a Single Project</h3>
      The system allows you to take control of projects by creating them up front. These are known as 'controlled' project. This example shows how a controlled project can be used to define a payment flow with multiple participants all paying into the same project.</p><p>Controlled project are very powerful and unlock many different flows. For example, you could issue a Project for a repeat buyer on your system so they have a consistent set of account credentials to pay into.
    </td>
    <td><a href="/examples/multiple-participants-single-project">View&nbsp;Example</a></td>
  </tr>
  <tr>
    <td>
      <h3>➡️ Direct Checkout</h3>
      <p>
A direct checkout facilitates a payment between 2 parties. The example sets up a direct checkout. No server side intent is needed for direct checkouts.</p>
    </td>
    <td><a href="/examples/direct-checkout">View&nbsp;Example</a></td>
  </tr>
</table>
