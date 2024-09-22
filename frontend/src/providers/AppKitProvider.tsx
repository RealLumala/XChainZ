// src/providers/AppKitProvider.tsx
import React, { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { baseSepolia, sepolia } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Define the projectId from Reown Cloud
const projectId = '67b3d2c3069aac4a40013f3312bd2b31'; // Replace with actual project ID

// Metadata configuration
const metadata = {
  name: 'AppKit',
  description: 'Blockchain Integration Dashboard',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Networks
export const networks = [sepolia, baseSepolia];

// Query Client setup
const queryClient = new QueryClient();

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
});

// Create AppKit Modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia, baseSepolia],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

// Type definition for AppKitProvider props
interface AppKitProviderProps {
  children: ReactNode;
}

// AppKitProvider Component
export const AppKitProvider: React.FC<AppKitProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
