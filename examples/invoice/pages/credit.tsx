import ts from '@trustshare/api';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';


const Credit: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <p className="mb-2">
          We have credited your project you should start to receive webhooks
          now.
        </p>

        <a
          target="_blank"
          rel="noreferrer"
          href={`https://dashboard.trustshare.io/project/${props.data.project_id}`}
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 disabled:cursor-not-allowed"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async ({
  query,
}) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');

  const res = await trustshare.api.v1._sandbox.creditProject({
    amount: Number(query.amount),
    id: query.project_id as string,
    reference: query.reference as string,
  });

  return {
    props: {
      data: {
        ...res.api.v1._sandbox.creditProject,
        ...query,
      },
    },
  };
};

export default Credit;
