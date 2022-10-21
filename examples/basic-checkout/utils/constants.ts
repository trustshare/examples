import { ParticipantType, SettlementInput } from '@trustshare/api';
import { SettlementType } from '@trustshare/api/dist/types/types';
import { products } from '@package/components/src/constants';

const intentData = [
  {
    type: 'immediate',
    to: {
      type: 'individual' as ParticipantType,
      email: 'e2e+test+target+two@trustshare.co',
      name: 'Barry Bonds',
    },
  },
  {
    type: 'escrow',
    to: {
      type: 'individual' as ParticipantType,
      email: 'e2e+test+target+one@trustshare.co',
      name: 'Joe Smith',
    },
  },
];

export const settlements: SettlementInput[] = products.map((product, i) => {
  return {
    type: intentData[i].type as SettlementType,
    amount: product.price,
    description: product.name,
    to: intentData[i].to,
    summary: `${product.quantity} x ${product.color}`,
  };
});
