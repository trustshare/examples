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

const Redirect = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // See the invoice data in the console.
  console.log(props.data);

  const {
    reference,
    participant,
    created_at,
    settlements,
    collect,
    account,
    total,
    subtotal,
    fee,
  } = props.data;

  return (
    <div>
      <div className="mx-auto p-16 max-w-[800px]">
        <div className="flex items-center justify-between mb-8 px-3">
          <div>
            <span className="text-2xl">Invoice {reference}</span>
            <br />
            {/* pretty date */}
            <span>Date</span>: {new Date(created_at).toLocaleDateString()}
            <br />
          </div>
          <div className="max-w-[300px]">
            <Image width="200px" height="50px" src={logo} alt="Company Logo" />
          </div>
        </div>

        <div className="text-right mb-8 px-3">
          {participant.name}
          <br />
          {participant.address?.address_line_1}
          <br />
          {participant.address?.address_line_2}
          <br />
          {participant.address?.town_city}
          <br />
          {participant.address?.postal_code}
        </div>

        <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>

        <div className="mb-8 px-3">
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            aliquam vestibulum elit, id rutrum sem lobortis eget. In a massa et
            leo vehicula dapibus. In convallis ut nisi ut vestibulum. Integer
            non feugiat tellus. Nullam id ex suscipit, volutpat sapien
            tristique, porttitor sapien.
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-5">Line items:</h2>
          <ul>
            {settlements.map((settlement) => {
              return (
                <div
                  key={settlement.id}
                  className="flex justify-between mb-4 bg-gray-200 px-3 py-2"
                >
                  <div>
                    <div className="text-md">{settlement.summary}</div>
                    <div className="text-xs">{settlement.description}</div>

                    <div className="text-xs">
                      <span>To be paid before</span>{' '}
                      {new Date(settlement.required_by).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    {convertPenniesToPounds(settlement.amount)}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-between items-center mb-2 px-3">
          <div className="text-md leading-none">
            <span className="">Subtotal</span>:
          </div>
          <div className="text-md text-right font-medium">
            {convertPenniesToPounds(subtotal)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2 px-3">
          <div className="text-md leading-none">
            <span className="">Fee</span>:
          </div>
          <div className="text-md text-right font-medium">
            {convertPenniesToPounds(fee)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2 px-3">
          <div className="text-xl leading-none">
            <span className="">Total (inc fee)</span>:
          </div>
          <div className="text-xl text-right font-medium">
            {convertPenniesToPounds(total)}
          </div>
        </div>

        <h2 className="text-xl mt-10">Payment Information:</h2>
        <div className='mb-5'>Please pay into the following bank details:</div>
        <div className="mb-8 text-md p-5 bg-gray-200">
          <p>Acc Number: {collect.local_bank_transfer.account_number}</p>
          <p>
            Sort Code:{' '}
            {collect.local_bank_transfer.routing_data[0].routing_code}
          </p>
        </div>

        <div className="mb-8 text-4xl text-center px-3">
          <span>Thank you!</span>
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

export default Redirect;
