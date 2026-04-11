use {
    anchor_lang::prelude::*,
    anyhow::Result,
};

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AutonomMarketOpeningData {
    pub feeds: Vec<u8>,
    pub market_close_affected_feeds: Vec<u8>,
    pub market_open_timestamp: i64,
    pub market_close_timestamp: i64,
    pub signature: [u8; 64],
    pub recovery_id: u8,
}

impl AutonomMarketOpeningData {
    /// Build a message hash from the market opening data payload.
    ///
    /// Fidesium M5 (release/39): feeds and market_close_affected_feeds are concatenated
    /// without a length prefix. Encoding is known trusted-signer safe; documented in
    /// the adrena on-chain program. Layout:
    ///   - market_open_timestamp (i64 LE)
    ///   - market_close_timestamp (i64 LE)
    ///   - feeds (u8 sequence)
    ///   - market_close_affected_feeds (u8 sequence)
    ///   then keccak256-hashed via solana_program::keccak::hashv.
    pub fn build_message_hash(&self) -> Result<[u8; 32]> {
        use solana_program::keccak::hashv;

        let mut msg = vec![];

        msg.extend_from_slice(&self.market_open_timestamp.to_le_bytes());
        msg.extend_from_slice(&self.market_close_timestamp.to_le_bytes());

        self.feeds.iter().for_each(|feed_id| msg.push(*feed_id));
        self.market_close_affected_feeds
            .iter()
            .for_each(|feed_id| msg.push(*feed_id));

        Ok(hashv(&[msg.as_slice()]).to_bytes())
    }
}
