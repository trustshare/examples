import ts, { PaymentIntent } from '@trustshare/api';
import sdk, { CheckoutResult } from '@trustshare/sdk';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const Checkout: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  async function handleClick() {
    const trustshare = sdk(process.env.NEXT_PUBLIC_TRUSTSHARE_PUBLIC_KEY ?? '');
    const result = await trustshare.sdk.v1.confirmPaymentIntent(
      props.client_secret
    );
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className='text-center'>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={handleClick}
        >
          Create payment intent now against project {props.project_id}
        </button>
        <a
          className="underline font-bold"
          target={'_blank'}
          rel={'noreferrer'}
          href={`https://dashboard.trustshare.io/project/${props.project_id}`}
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');
  const randomNumber = () => Math.random().toString(36).slice(2);

  // In this example a Project ID must be supplied via query string.
  // An example urls would be: http://localhost:3000/?projectId=YOUR_PROJECT_ID
  // In your application you will need to create a project first, and this project will be stored in your database.
  // You can then use the project ID from your database to create a payment intent.

  const project_id = query.projectId as string;

  if (project_id == null) {
    throw new Error('Project ID is missing');
  }

  const {
    api: {
      v1: { createPaymentIntent: full },
    },
  } = await trustshare.api.v1.createPaymentIntent({
    type: 'checkout',
    project_id,
    fee_flat: 1000,
    fee_percentage: 0.015,
    from: {
      email: `e2e+${randomNumber()}@trustshare.co`, // Random email address for testing purposes. This should be your user's email address.
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
        type: 'funding',
        amount: 10000,
        description: 'Some funding',
      },
    ],
  });

  return {
    props: {
      client_secret: (full as PaymentIntent).client_secret,
      project_id,
    },
  };
};

export default Checkout;
