// src/App.tsx
import React, { useState } from 'react';
import { AppKitProvider } from './providers/AppKitProvider';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Transactions from './components/Transactions';
import BlockchainOperations from './components/BlockchainOperations';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AppKitProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        
        {/* Mobile menu */}
        {isMobileMenuOpen && <MobileMenu />}

        {/* Desktop menu */}

        {/* Main content area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <WalletInfo /> */}
            <Transactions />
            <BlockchainOperations />
          </div>
        </main>
      </div>
    </AppKitProvider>
  );
};

export default App;
