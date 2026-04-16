const listings = [
  {
    title: 'Create a Smart Contract',
    reward: '5000 $GIGS',
    details: 'Deploy a secure Solana program with audit-ready architecture.'
  },
  {
    title: 'Build a DAO Voting UI',
    reward: '3200 $GIGS',
    details: 'Design a responsive governance dashboard with wallet support.'
  },
  {
    title: 'Develop NFT Mint Page',
    reward: '4100 $GIGS',
    details: 'Create a high-conversion mint flow with anti-bot protections.'
  }
];

function Marketplace() {
  return (
    <div className="market-grid">
      {listings.map((listing) => (
        <article key={listing.title} className="market-card glass-card">
          <h3>{listing.title}</h3>
          <p>{listing.details}</p>
          <div className="market-footer">
            <span>{`Reward: ${listing.reward}`}</span>
            <button type="button">Hire/Trade</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Marketplace;
