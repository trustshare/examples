import { products } from '@package/components/src/constants';
import type {
  ParticipantType,
  PaymentIntent,
  SettlementType,
} from '@trustshare/api';
import ts from '@trustshare/api';
import { Checkout } from 'components/Checkout';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage<{ client_secret: string }> = ({ client_secret }) => {
  return <Checkout clientSecret={client_secret} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');

  const intentData = [
    {
      type: 'immediate',
      to: {
        type: 'individual' as ParticipantType,
        email: 'e2e+test+target+two@trustshare.co',
        name: 'Barry Bonds',
      },
    },
    {
      type: 'escrow',
      to: {
        type: 'individual' as ParticipantType,
        email: 'e2e+test+target+one@trustshare.co',
        name: 'Joe Smith',
      },
    },
  ];

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
    settlements: products.map((product, i) => {
      return {
        type: intentData[i].type as SettlementType,
        amount: product.price,
        description: product.name,
        to: intentData[i].to,
        summary: `${product.quantity} x ${product.color}`,
      };
    }),
  });

  return {
    props: {
      client_secret: (createPaymentIntent as PaymentIntent).client_secret,
    },
  };
};

export default Home;
