import { ParticipantType, SettlementInput } from '@trustshare/api';
import { SettlementType } from '@trustshare/api/dist/types/types';

export const products = [
  {
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: 8000,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    intent: {
      type: 'escrow',
      to: {
        type: 'individual' as ParticipantType,
        email: 'e2e+test+target+one@trustshare.co',
        name: 'Joe Smith',
      },
    },
  },
  {
    name: 'Medium Stuff Satchel',
    color: 'Blue',
    price: 10000,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    intent: {
      type: 'immediate',
      to: {
        type: 'individual' as ParticipantType,
        email: 'e2e+test+target+two@trustshare.co',
        name: 'Barry Bonds',
      },
    },
  },
];

export const settlements: SettlementInput[] = products.map((product) => {
  return {
    type: product.intent.type as SettlementType,
    amount: product.price,
    description: product.name,
    to: product.intent.to,
    summary: `${product.quantity} x ${product.color}`,
  };
});
