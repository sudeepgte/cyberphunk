USE cypherpunk;

-- Sample Blog Posts
INSERT INTO posts (title, slug, excerpt, body, author, category, tags, thumbnail) VALUES
('The Cypherpunk Manifesto: Why Privacy Is Not Optional',
 'cypherpunk-manifesto-privacy',
 'Revisiting the seminal 1993 document that predicted the privacy battles of the digital age — and why its lessons matter more than ever.',
 '<p>In 1993, Eric Hughes published the Cypherpunk Manifesto. It began simply: <em>"Privacy is necessary for an open society in the electronic age."</em> Today, those words resonate with prophetic clarity...</p><p>The manifesto argued that privacy is not secrecy — it is the power to selectively reveal yourself to the world. Cypherpunks believed that code, not laws, would protect this right...</p>',
 'Eric Hughes', 'Privacy', 'privacy,manifesto,cypherpunk', 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800'),

('Bitcoin at 15: From Cypherpunk Dream to Global Reserve',
 'bitcoin-15-years-global-reserve',
 'How Satoshi Nakamoto''s white paper transformed from a mailing list post to the foundation of a $1 trillion asset class.',
 '<p>On October 31, 2008, an anonymous figure calling themselves Satoshi Nakamoto posted a nine-page white paper to a cryptography mailing list...</p>',
 'Satoshi Nakamoto', 'Bitcoin', 'bitcoin,blockchain,cryptocurrency', 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800'),

('DeFi Summer 3.0: The Protocols Rewriting Finance',
 'defi-summer-3-protocols',
 'A deep dive into the latest wave of decentralized finance protocols that are challenging traditional banking institutions.',
 '<p>Decentralized Finance has matured dramatically since its explosive debut in 2020...</p>',
 'Vitalik Buterin', 'DeFi', 'defi,ethereum,finance', 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800'),

('Zero-Knowledge Proofs: The Math Behind Private Transactions',
 'zero-knowledge-proofs-explained',
 'Understanding ZK-SNARKs and ZK-STARKs — the cryptographic magic that enables Zcash, StarkNet, and zkSync.',
 '<p>Imagine proving you know a secret without revealing what the secret is. That''s the premise of zero-knowledge proofs...</p>',
 'Zooko Wilcox', 'Privacy', 'zkproofs,cryptography,privacy', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'),

('NFTs Beyond Art: The Next Chapter for Digital Ownership',
 'nfts-beyond-art-digital-ownership',
 'How non-fungible tokens are evolving from profile pictures to real-world asset tokenization and digital identity.',
 '<p>The NFT boom of 2021 was just the opening act. The real revolution in digital ownership is only beginning...</p>',
 'Yat Siu', 'NFTs', 'nft,ownership,web3', 'https://images.unsplash.com/photo-1646753522408-077ef9839300?w=800'),

('Solana vs Ethereum: The Layer-1 Wars of 2026',
 'solana-vs-ethereum-layer1-2026',
 'Analyzing the technical and ecosystem differences between the two dominant smart contract platforms as they compete for developer mindshare.',
 '<p>The debate has raged since Solana launched its mainnet in March 2020: can any chain dethrone Ethereum?...</p>',
 'Anatoly Yakovenko', 'Blockchain', 'solana,ethereum,layer1', 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800');

-- Sample Events
INSERT INTO events (title, type, description, date, end_date, location, capacity, registered, image_url, is_featured) VALUES
('Cypherpunk Bootcamp: Web3 Foundations',
 'bootcamp',
 'A 4-week intensive program covering blockchain fundamentals, smart contract development with Solidity, wallet integration, and DeFi protocols. Perfect for developers transitioning into Web3.',
 '2026-06-01', '2026-06-28', 'Online (Global)', 200, 87, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', TRUE),

('Global Cypherpunk Hackathon 2026',
 'hackathon',
 '72-hour global hackathon focused on privacy-preserving technologies. Build tools that champion digital sovereignty. $50,000 in prizes across categories: Privacy, DeFi, DAO Infrastructure.',
 '2026-07-15', '2026-07-18', 'Berlin, Germany + Online', 500, 312, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', TRUE),

('Web3 Accelerator Program — Cohort 3',
 'accelerator',
 'A 12-week accelerator for early-stage Web3 startups. Mentorship from industry leaders, $25K seed investment, and introductions to top-tier VCs in the crypto space.',
 '2026-08-10', '2026-11-01', 'Singapore + Dubai', 30, 12, 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', FALSE),

('Cypherpunk Pop-up Village: Lisbon',
 'village',
 'A week-long co-living and co-working experience for Web3 builders. Workshops, talks, beach hacks, and networking with 100+ builders from around the world.',
 '2026-09-20', '2026-09-27', 'Lisbon, Portugal', 100, 67, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', FALSE);

-- Sample Projects
INSERT INTO projects (title, description, category, tags, image_url, github_url, live_url, author, is_featured) VALUES
('GhostPay — Anonymous Payment Protocol',
 'A zero-knowledge payment protocol built on Ethereum that enables fully anonymous transactions without revealing sender, receiver, or amount. Uses ZK-SNARKs for proof generation.',
 'privacy', 'privacy,zkproofs,ethereum,solidity', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', 'https://github.com', 'https://ghostpay.io', 'CipherDev Team', TRUE),

('ApeVault — NFT-Collateralized Lending',
 'Borrow stablecoins against your NFT collection without selling your assets. Supports BAYC, CryptoPunks, Azuki, and 50+ collections with real-time floor price oracles.',
 'defi', 'defi,nft,lending,collateral', 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800', 'https://github.com', 'https://apevault.finance', 'DeFi Apes', TRUE),

('DAOforge — No-Code DAO Builder',
 'Create and manage decentralized autonomous organizations without writing a single line of code. Includes voting systems, treasury management, and proposal frameworks.',
 'dao', 'dao,governance,nocode,web3', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'https://github.com', 'https://daoforge.xyz', 'CryptoCraft Labs', FALSE),

('SolanaStream — Real-Time DeFi Analytics',
 'Monitor DeFi positions, wallet activity, and protocol metrics across Solana ecosystem in real-time. Includes portfolio tracking, yield farming optimizer, and liquidation alerts.',
 'defi', 'solana,analytics,defi,dashboard', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'https://github.com', NULL, 'BlockScope', FALSE),

('ZKVote — Private On-Chain Voting',
 'Decentralized voting protocol using zero-knowledge proofs to ensure ballot privacy. Voters prove eligibility without revealing their identity. Used in 3 major DAO elections.',
 'privacy', 'voting,zkproofs,dao,governance', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 'https://github.com', 'https://zkvote.org', 'PrivacyFirst', FALSE),

('CypherBadge — Soulbound Achievement NFTs',
 'Non-transferable NFTs that certify Web3 skills and achievements. Issued upon completing bootcamps, hackathons, or passing technical assessments. Your on-chain resume.',
 'nft', 'nft,soulbound,identity,credentials', 'https://images.unsplash.com/photo-1646753522408-077ef9839300?w=800', 'https://github.com', 'https://cypherbadge.io', 'Cypherpunk Team', TRUE),

('MeshNet — P2P Encrypted Messaging',
 'Browser-based peer-to-peer encrypted messaging with no central server. Messages are routed through a decentralized mesh network. No accounts, no logs, no trace.',
 'privacy', 'privacy,p2p,messaging,encryption', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', 'https://github.com', 'https://meshnet.dev', 'CipherDev Team', FALSE),

('LiquidGov — Cross-Chain Governance',
 'Vote on protocol proposals across 10+ blockchains using a single interface. Aggregates governance from Ethereum, Solana, Cosmos, and more. Liquid democracy implementation.',
 'dao', 'dao,crosschain,governance,multichain', 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800', 'https://github.com', NULL, 'MultiChain Labs', FALSE);
