import { CheckoutResult } from '@package/components/src/CheckoutResult';
import { products } from '@package/components/src/constants';
import { ShoppingCart } from '@package/components/src/ShoppingCart';
import type { CheckoutResult as CheckoutResultType } from '@trustshare/sdk';
import sdk from '@trustshare/sdk';
import { useState } from 'react';

export function Checkout({ clientSecret }: { clientSecret: string }) {
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResultType | null>(null);

  async function handleClick() {
    const trustshare = sdk(process.env.NEXT_PUBLIC_TRUSTSHARE_PUBLIC_KEY ?? '');
    const result = await trustshare.sdk.v1.confirmPaymentIntent(clientSecret);
    setCheckoutResult(result);
  }

  return checkoutResult ? (
    <CheckoutResult checkout={checkoutResult} />
  ) : (
    <ShoppingCart handleClick={handleClick} products={products} />
  );
}
