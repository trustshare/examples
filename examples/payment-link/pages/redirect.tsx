import { GetServerSideProps } from 'next';

const Redirect = (props: { data: Record<string, string> }) => {
  return (
    <div>
      <h1>This is the redirect page</h1>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      data: query,
    },
  };
};

export default Redirect;
