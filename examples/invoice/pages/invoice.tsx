import ts, { GetInvoiceQuery } from '@trustshare/api';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import logo from 'assets/logo.png';
import Image from 'next/image';

const convertPenniesToPounds = (pennies: number) => {
  // Use Intl.NumberFormat to format the amount as a currency.
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(pennies / 100);
};

const Invoice = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const {
    reference,
    created_at,
    settlements,
    collect,
    total,
    subtotal,
    fee,
    project_id,
  } = props.data;

  return (
    <div className="grid place-items-center h-screen ">
      <div className="mx-auto max-w-[800px] min-w-[600px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-2xl">Invoice {reference}</span>
            <br />
            <span>Date</span>: {new Date(created_at).toLocaleDateString()}
            <br />
          </div>
          <div className="max-w-[300px]">
            <Image width="200px" height="50px" src={logo} alt="Company Logo" />
          </div>
        </div>

        <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>

        <div>
          <ul>
            {settlements.map((settlement) => {
              return (
                <div
                  key={settlement.id}
                  className="flex justify-between mb-2 py-2"
                >
                  <div>
                    <div className="font-bold text-md">
                      {settlement.description}
                    </div>
                    <div className="text-md">{settlement.summary}</div>
                  </div>
                  <div className="text-right font-medium tabular-nums">
                    {convertPenniesToPounds(settlement.amount)}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="border border-t-2 border-gray-200 px-3 my-8"></div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-md leading-none">
            <span className="">Subtotal</span>:
          </div>
          <div className="text-md text-right font-medium tabular-nums">
            {convertPenniesToPounds(subtotal)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-md leading-none">
            <span className="">Fee</span>:
          </div>
          <div className="text-md text-right font-medium tabular-nums">
            {convertPenniesToPounds(fee)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-md font-bold leading-none">
            <span className="">Total (inc fee)</span>:
          </div>
          <div className="text-md font-bold text-right tabular-nums">
            {convertPenniesToPounds(total)}
          </div>
        </div>
        <h2 className="text-xl mt-10">Payment Information:</h2>
        <div className="mb-5">Please pay into the following bank details:</div>
        <div className="mb-8 text-md p-5 bg-gray-200">
          <p>
            Acc Number:{' '}
            <span className="tabular-nums">
              {collect.local_bank_transfer.account_number}
            </span>
          </p>
          <p>
            Sort Code:{' '}
            <span className="tabular-nums">
              {collect.local_bank_transfer.routing_data[0].routing_code}
            </span>
          </p>
        </div>

        <div className="mb-8 text-4xl text-center px-3">
          <a
            href={`/credit?project_id=${project_id}&reference=${reference}&amount=${total}`}
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 disabled:cursor-not-allowed"
          >
            Credit Invoice (Only in Sandbox)
          </a>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: GetInvoiceQuery['api']['v1']['getInvoice'];
}> = async ({ query }) => {
  const trustshare = ts(process.env.TRUSTSHARE_PRIVATE_API_KEY ?? '');

  const {
    api: {
      v1: { getInvoice: invoice },
    },
  } = await trustshare.api.v1.getInvoice({ id: query.invoice_id as string });

  return {
    props: {
      data: invoice,
    },
  };
};

export default Invoice;
