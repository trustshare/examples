import { products } from 'utils/constants';
import sdk from '@trustshare/sdk';
import type { CheckoutResult as CheckoutResultType } from '@trustshare/sdk';
import { useState } from 'react';
import { CheckoutResult } from '@package/components/src/CheckoutResult';
import { ShoppingCart } from '@package/components/src/ShoppingCart';

export function Checkout({ clientSecret }: { clientSecret: string }) {
  const [checkout, setCheckout] = useState<CheckoutResultType | null>(null);

  async function handleClick() {
    const trustshare = sdk(process.env.NEXT_PUBLIC_TS_PUBLIC_KEY ?? '');
    const result = await trustshare.sdk.v1.confirmPaymentIntent(clientSecret);
    setCheckout(result);
  }

  return checkout ? (
    <CheckoutResult checkout={checkout} />
  ) : (
    <ShoppingCart handleClick={handleClick} products={products} />
  );
}
