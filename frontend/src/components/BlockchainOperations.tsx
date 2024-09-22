// src/components/BlockchainOperations.tsx
import React from 'react';

const BlockchainOperations: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Blockchain Operations</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Send Transaction
      </button>
    </div>
  );
};

export default BlockchainOperations;
