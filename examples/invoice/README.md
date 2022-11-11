<p align="center">
  <br/>
  <img width="400px" src="https://assets.staging.trustshare.io/trustshare-logo.png">
  <br/>
  <br/>
  <strong>Example - Invoice</strong>
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

## 📖 Introduction
An invoice Payment Intent provisions an invoice, to be fulfilled now or in the future. It offers the same mechanism to describe settlements to multiple sellers from a single buyer.  
  
An invoice Payment Intent requires a "controlled" Project to be created up front via the Create Project endpoint. You can find more information on Projects [here](https://docs.trustshare.io/guides/projects)

An invoice intent still requires confirmation by a user via the Client SDK, however no UI will be displayed to the user. Here, we show an example of how an invoice can be handled by once it has been created.

## 🌳 Environment Variables

Please make sure you have followed the setup instructions in the [README](/README.md) in the root of the repository.

## 🚀 Quick start

From the root run

```bash
yarn workspace @examples/invoice dev
```
Once the server is up and running, open `http://localhost:3000` to get started.