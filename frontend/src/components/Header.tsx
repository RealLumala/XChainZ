// src/components/Header.tsx
import React from 'react';
import { Menu, X } from 'lucide-react';
import DesktopMenu from './DesktopMenu';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Cross-chain Transfer</h1>
      <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <DesktopMenu /> {/* Desktop menu for larger screens */}
    </header>
  );
};

export default Header;
