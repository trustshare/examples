import type { GetServerSideProps, NextPage } from 'next';
import { ShoppingCart } from 'components/ShoppingCart';
import type { PaymentIntent } from '@trustshare/api';
import ts from '@trustshare/api';
import { settlements } from 'utils/constants';
import { TestComponent } from '@package/components/src/TestComponent';

const Home: NextPage<{ client_secret: string }> = ({ client_secret }) => {
  return (
    <>
      <TestComponent />
      <ShoppingCart clientSecret={client_secret} />)
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');
  const {
    api: {
      v1: { createPaymentIntent },
    },
  } = await trustshare.api.v1.createPaymentIntent({
    type: 'checkout',
    currency: 'gbp',
    fee_flat: 0,
    fee_percentage: 0.015,
    from: {
      email: `e2e@trustshare.co`, // This would be the logged in users email address
      type: 'individual',
      name: 'Simon Hopkins',
    },
    settlements: settlements,
  });

  return {
    props: {
      client_secret: (createPaymentIntent as PaymentIntent).client_secret,
    },
  };
};

export default Home;
