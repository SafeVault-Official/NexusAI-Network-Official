import { useMemo, useState } from 'react';
import Chat from './components/Chat';
import Marketplace from './components/Marketplace';

const TABS = {
  CHAT: 'AI Chat',
  MARKETPLACE: 'Marketplace'
};

const shortenAddress = (address) => `${address.slice(0, 4)}...${address.slice(-4)}`;

const createMockAddress = () => {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 44 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
};

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.CHAT);

  const formattedWalletAddress = useMemo(
    () => (walletAddress ? shortenAddress(walletAddress) : ''),
    [walletAddress]
  );

  const handleWalletToggle = () => {
    if (walletAddress) {
      setWalletAddress('');
      return;
    }

    setWalletAddress(createMockAddress());
  };

  const isConnected = Boolean(walletAddress);

  return (
    <div className="app-shell">
      <nav className="navbar glass-card">
        <div className="logo">$GIGS Network</div>
        <button className="wallet-button" onClick={handleWalletToggle}>
          {isConnected ? formattedWalletAddress : 'Connect Wallet'}
        </button>
      </nav>

      {!isConnected ? (
        <section className="gatekeeper glass-card">
          <h1>Welcome to NexusAI - Powered by $GIGS</h1>
          <p>Connect your wallet to access the decentralized AI workspace.</p>
        </section>
      ) : (
        <main className="dashboard">
          <div className="tabs glass-card">
            {Object.values(TABS).map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <section className="tab-content glass-card">
            {activeTab === TABS.CHAT ? <Chat /> : <Marketplace />}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
