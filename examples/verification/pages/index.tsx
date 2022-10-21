import ts from '@trustshare/api';
import sdk from '@trustshare/sdk';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';

const Verification: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  function handleClick() {
    const trustshare = sdk(process.env.TRUSTSHARE_PRIVATE_PUBLIC_KEY ?? '');
    const result = trustshare.sdk.v1
      .confirmVerification(props.verification)
      .then((result) => {
        console.log({ result });
      });
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <button
          className="flex items-center justify-center rounded-md border disabled:bg-gray-500 border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={handleClick}
        >
          Verify Participant Full
        </button>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');
  const randomNumber = () => Math.random().toString(36).slice(2);

  // FIrst you have to create a project.
  const res = await trustshare.api.v1.createVerification({
    email: `e2e+${randomNumber()}@trustshare.co`, // We use a random email here to avoid conflicts with existing users. You should use your customers email here.
    name: 'Rufus McGuire',
    type: 'individual',
    address: {
      address_line_1: '23 Baker Street',
      address_line_2: 'Kent',
      town_city: 'London',
      postal_code: 'KN10 3PL',
      country: 'GB',
    },
  });

  return {
    props: {
      verification: res.api.v1.createVerification.client_secret,
    },
  };
};

export default Verification;
