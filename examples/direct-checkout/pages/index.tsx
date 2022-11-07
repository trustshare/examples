import { Currency } from '@trustshare/api';
import sdk from '@trustshare/sdk';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

const Checkout: NextPage<{ currency: Currency }> = ({ currency }) => {
  async function handleClick() {
    const trustshare = sdk(process.env.NEXT_PUBLIC_TRUSTSHARE_PUBLIC_KEY ?? '');
    const result = await trustshare.sdk.v1.createDirectCheckout({
      currency,
    });
  }

  return (
    <div className="grid place-items-center h-screen">
      <button
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        onClick={handleClick}
      >
        Pay Now with Direct Checkout
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      currency: 'gbp',
    },
  };
};

export default Checkout;
