// ESM
import Fastify from "fastify";

import type { ParticipantType } from "@trustshare/api";
import ts from "@trustshare/api";

// This will get the environment variables from the .env file
import * as dotenv from "dotenv";
dotenv.config();

// Create the trustshare sdk
const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? "", {
  __BASE_URL: ".nope.sh",
});

const fastify = Fastify({
  logger: true,
});

// See App.tsx for how this is used.
fastify.get("/createPaymentIntent", async (request, reply) => {
  const res = await getPaymentIntent();
  // curl GET example
  // curl -X GET http://localhost:9987/createPaymentIntent
  reply.type("application/json").code(200);
  if (res.__typename === "PaymentIntent") {
    // Payment Intents have client secrets
    return {
      client_secret: res.client_secret,
    };
  }
});

fastify.listen({ port: 9987 }, (err, address) => {
  if (err) {
    throw err;
  }
  console.log("Server listening on", address);
});

export async function getPaymentIntent() {
  const {
    api: {
      v1: { createPaymentIntent },
    },
  } = await trustshare.api.v1.createPaymentIntent({
    type: "checkout",
    currency: "gbp",
    fee_flat: 0,
    fee_percentage: 0.015,
    from: {
      email: `e2e@trustshare.co`,
      type: "individual",
      name: "Simon Hopkins",
    },
    settlements: [
      {
        type: "funding",
        amount: 1000,
        description: "Some funding",
      },
      {
        type: "immediate",
        amount: 1000,
        description: "Paying Third Party 2",
        summary: "Fx Outbound",
        fee_flat: 250,
        to: {
          type: "third_party",
          email: "e2e+user+2@trustshare.co",
          name: "Third Party 2",
          address: {
            address_line_1: "2 Third Party Way",
            town_city: "Third Party City",
            postal_code: "TP2 2PT",
            country: "GB",
          },
          bank_account: {
            country: "FR",
            currency: "eur",
            iban: "FR1420041010050500013M02606",
            bic_swift: "PSSTFRPPLIL",
          },
        },
      },
      {
        type: "immediate",
        amount: 1000,
        description: "Paying Third Party 3",
        summary: "International Outbound",
        fee_flat: 250,
        to: {
          type: "third_party",
          email: "e2e+user+3@trustshare.co",
          name: "Third Party 3",
          address: {
            address_line_1: "3 Third Party Way",
            town_city: "Third Party City",
            postal_code: "TP3 3PT",
            country: "GB",
          },
          bank_account: {
            country: "EG",
            currency: "egp",
            iban: "FR1420041010050500013M02606",
            bic_swift: "PSSTFRPPLIL",
          },
        },
      },
    ],
  });

  return createPaymentIntent;
}
