import ts, { Country, PaymentIntent, SettlementInput } from '@trustshare/api';
import sdk, { CheckoutResult } from '@trustshare/sdk';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { useState } from 'react';

const Checkout: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  async function handleClick(clientSecret: string) {
    setLoading(true);
    const trustshare = sdk(process.env.TRUSTSHARE_PUBLIC_API_KEY ?? '');
    const result = await trustshare.sdk.v1.confirmPaymentIntent(clientSecret);
    const url = new URL(`http://localhost:${props.port}/invoice`);
    url.searchParams.append('checkout_id', result.checkout_id);
    url.searchParams.append('project_id', result.project_id);
    url.searchParams.append('invoice_id', result.invoice_id as string);
    (window as Window).location = url.toString();
  }

  const [loading, setLoading] = useState(false);

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <p className="mb-2">
          By clicking the button below you agree to the terms and conditions
          outlined{' '}
          <a
            className="underline text-indigo-500"
            href="https://checkout.trustshare.io/buyer-terms.pdf"
          >
            here
          </a>
        </p>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={() => handleClick(props.full)}
        >
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              data-motion-id="svg 1"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          {loading ? 'Processing...' : 'Confirm invoice'}
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');
  const port = req.socket.localPort;
  // First you have to create a project.
  const {
    api: {
      v1: { createProject: project },
    },
  } = await trustshare.api.v1.createProject({
    currency: 'gbp',
  });

  const {
    api: {
      v1: { createPaymentIntent: full },
    },
  } = await trustshare.api.v1.createPaymentIntent({
    type: 'invoice',
    project_id: project.id, // Invoice intent must be created with a project id.
    fee_flat: 1000,
    fee_percentage: 0.015,
    from: {
      email: `e2e+@trustshare.co`,
      type: 'individual',
      name: 'Rufus McGuire',
      address: {
        address_line_1: '23 Baker Street',
        address_line_2: 'Kent',
        town_city: 'London',
        postal_code: 'KN10 3PL',
        country: 'GB',
      },
    },
    settlements: [
      {
        type: 'escrow',
        amount: 200000,
        description: `Discombobulator Widget`,
        summary: 'Quantity: 500',
        fee_flat: 1000,
        to: {
          email: `sink@trustshare.co`,
        },
      },
      {
        type: 'escrow',
        amount: 500000,
        description: `Rotator Flange`,
        summary: 'Quantity: 1500',
        fee_flat: 1000,
        to: {
          email: `sink@trustshare.co`,
        },
      },
    ],
  });

  return {
    props: {
      full: (full as PaymentIntent).client_secret,
      port: port,
    },
  };
};

export default Checkout;
