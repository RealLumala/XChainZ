// src/components/Transactions.tsx
import React from 'react';

const Transactions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-2">
        <li>Sent 10 USDC to 0xabcd...efgh</li>
        <li>Received 5 USDC from 0x9876...5432</li>
      </ul>
    </div>
  );
};

export default Transactions;
