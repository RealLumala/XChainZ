// src/components/DesktopMenu.tsx
import React from 'react';
import ConnectButton from './ConnectButton';

const DesktopMenu: React.FC = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-4">
        {/* <li className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
          <Shield size={20} />
          <WorldIDVerification />
        </li> */}
        {/* <li className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
          <CircleDollarSign size={20} />
          <span>USDC Balance</span>
        </li> */}
        {/* <li className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
          <ArrowRightLeft size={20} />
          <span>Transactions</span>
        </li> */}
        {/* <li className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
          <Activity size={20} />
          <span>Blockchain Status</span>
        </li> */}
        <li className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
          <ConnectButton /> {/* Reown's Connect Button */}
        </li>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
