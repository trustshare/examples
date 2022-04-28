import { SettlementInput } from '@trustshare/api';

export const products = [
  {
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: 8000,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  },
  {
    name: 'Medium Stuff Satchel',
    color: 'Blue',
    price: 10000,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  },
];

export const settlements: SettlementInput[] = products.map((product) => {
  return {
    type: 'funding',
    amount: product.price,
    description: product.name,
  };
});
