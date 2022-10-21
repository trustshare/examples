import type { Products } from './constants';

function convertToPounds(price: number) {
  return `£${(price / 100).toFixed(2)}`;
}

type Props = {
  handleClick: () => Promise<void>;
  products: Products;
};

export function ShoppingCart(props: Props) {
  const { handleClick, products } = props;
  return (
    <div className="grid place-items-center h-screen">
      <div className="pointer-events-auto w-screen max-w-md">
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="w-full">
              <img
                className="w-1/2 m-a p-2 m-auto"
                alt={'trustshare logo'}
                src={'https://assets.trustshare.io/3B8uJNZDzdR2MyJTw3.png'}
              />
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product, i) => (
                    <li key={i} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.imageSrc}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <span>{product.name}</span>
                            </h3>
                            <p className="ml-4">
                              {convertToPounds(product.price)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                {convertToPounds(
                  products.reduce((acc, curr) => curr.price + acc, 0)
                )}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Fees will be calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handleClick}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
