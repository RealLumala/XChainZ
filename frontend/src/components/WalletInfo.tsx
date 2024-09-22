// src/components/WalletInfo.tsx
import React from 'react';

const WalletInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
      <p>Address: 0x1234...5678</p>
      <p>Balance: 100 USDC</p>
    </div>
  );
};

export default WalletInfo;
