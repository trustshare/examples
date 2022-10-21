import ts, { PaymentIntent } from '@trustshare/api';
import sdk, { CheckoutResult } from '@trustshare/sdk';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const Checkout: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [invoiceResponse, setInvoiceResponse] = useState<null | CheckoutResult>(
    null
  );

  async function handleClick(clientSecret: string) {
    const trustshare = sdk(process.env.TRUSTSHARE_PUBLIC_API_KEY ?? '');
    const result = await trustshare.sdk.v1.confirmPaymentIntent(clientSecret);
    setInvoiceResponse(result);
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <button
          disabled={invoiceResponse != null}
          className="flex items-center justify-center rounded-md border disabled:bg-gray-500 border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={() => handleClick(props.full)}
        >
          Confirm invoice now (full details)
        </button>
        {invoiceResponse ? (
          <div>
            <div>You confirmed the invoice intent:</div>
            <p>Invoice ID: {invoiceResponse.invoice_id}</p>
            <p>Checkout ID: {invoiceResponse.checkout_id}</p>
            <p>Project ID: {invoiceResponse.project_id}</p>
            <a
              className="underline font-bold"
              target={'_blank'}
              rel={'noreferrer'}
              href={`https://dashboard.trustshare.io/project/${invoiceResponse.project_id}`}
            >
              View project
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');

  // FIrst you have to create a project.
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
        amount: 100000,
        description: 'Paying Third Party 1',
        summary: 'Local Outbound',
        fee_flat: 250,
        to: {
          type: 'third_party',
          email: 'third_party+1@trustshare.co',
          name: 'Third Party 1',
          address: {
            address_line_1: '1 Third Party Way',
            town_city: 'Third Party City',
            postal_code: 'TP1 1PT',
            country: 'GB',
          },
          bank_account: {
            country: 'GB',
            currency: 'gbp',
            account_number: '01139097',
            sort_code: '309455',
          },
        },
      },
    ],
  });

  return {
    props: {
      full: (full as PaymentIntent).client_secret,
    },
  };
};

export default Checkout;
