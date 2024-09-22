// src/components/MobileMenu.tsx
import React from 'react';
import ConnectButton from './ConnectButton';

const MobileMenu: React.FC = () => {
  return (
    <nav className="lg:hidden bg-blue-600 text-white p-4">
      <ul className="flex flex-col space-y-4">
        {/* <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
          <Shield size={20} />
          <WorldIDVerification />
        </li> */}
        {/* <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
          <CircleDollarSign size={20} />
          <span>USDC Balance</span>
        </li> */}
        {/* <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
          <ArrowRightLeft size={20} />
          <span>Transactions</span>
        </li>
        <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
          <Activity size={20} />
          <span>Blockchain Status</span>
        </li> */}
        <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
          <ConnectButton />
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
