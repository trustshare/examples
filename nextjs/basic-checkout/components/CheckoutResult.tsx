import { CheckoutResult } from '@trustshare/sdk';

// For illustration purposes, we're using a simple component that renders a result from a checkout.
export function CheckoutResult(props: { checkout: CheckoutResult }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <p className="text-xl">Checkout ID: {props.checkout.checkout_id}</p>
        <p className="text-xl">Project ID: {props.checkout.project_id}</p>
      </div>
    </div>
  );
}
