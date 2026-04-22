// Ported from adrena/programs/adrena/src/state/user_profile.rs (release/39).
// The UserProfile account stores these as raw `u8` (for zero-copy stability),
// so off-chain consumers that want typed access round-trip through TryFrom/From.

use crate::error::AdrenaError;
use anchor_lang::prelude::*;

#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum Title {
    Zero = 0,
    GoldenHands = 1,
    DiamondHands = 2,
    AwakeningRank1 = 3,
    AwakeningChallenger = 4,
    AwakeningContender = 5,
    ExpanseRank1 = 6,
    ExpanseChallenger = 7,
    ExpanseContender = 8,
    Trader = 9,
    EmergingTrader = 10,
    TopTier = 11,
    VolumeKing = 12,
    FutureMcDonaldsEmployee = 13,
    HighlyUnprofitableTrader = 14,
    SeverelyWounded = 15,
    DaddysMoney = 16,
    AllInAllGone = 17,
    HighlyProfitableTrader = 18,
    CertifiedMoneyPrinter = 19,
    WhaleAmongMen = 20,
    ApexTrader = 21,
    Unstoppable = 22,
    FreeKebab = 23,
    PassiveIncome = 24,
    AdrenaStakeholder = 25,
    BoardMember = 26,
    LiquidityKing = 27,
    BadLuckBrian = 28,
    LeCramer = 29,
    TheChameleon = 30,
    SoldierS2 = 31,
    SergeantS2 = 32,
    LieutenantS2 = 33,
    GeneralS2 = 34,
    BonkOperative = 35,
    JitoJuggernaut = 36,
    Season2Champion = 37,
    Season2Destroyer = 38,
    CrownSniffer = 39,
    CertifiedMenace = 40,
    TombRaider = 41,
    Saboteur = 42,
    Traitor = 43,
    Opportunist = 44,
    Relentless = 45,
    WetAndLosing = 46,
    Underwater = 47,
    BossMuncher = 48,
    Scratcher = 49,
    PaperBeatRock = 50,
    ThePainmaker = 51,
    ChickenWings = 52,
    NiceGuy = 53,
}

impl TryFrom<u8> for Title {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(Title::Zero),
            1 => Ok(Title::GoldenHands),
            2 => Ok(Title::DiamondHands),
            3 => Ok(Title::AwakeningRank1),
            4 => Ok(Title::AwakeningChallenger),
            5 => Ok(Title::AwakeningContender),
            6 => Ok(Title::ExpanseRank1),
            7 => Ok(Title::ExpanseChallenger),
            8 => Ok(Title::ExpanseContender),
            9 => Ok(Title::Trader),
            10 => Ok(Title::EmergingTrader),
            11 => Ok(Title::TopTier),
            12 => Ok(Title::VolumeKing),
            13 => Ok(Title::FutureMcDonaldsEmployee),
            14 => Ok(Title::HighlyUnprofitableTrader),
            15 => Ok(Title::SeverelyWounded),
            16 => Ok(Title::DaddysMoney),
            17 => Ok(Title::AllInAllGone),
            18 => Ok(Title::HighlyProfitableTrader),
            19 => Ok(Title::CertifiedMoneyPrinter),
            20 => Ok(Title::WhaleAmongMen),
            21 => Ok(Title::ApexTrader),
            22 => Ok(Title::Unstoppable),
            23 => Ok(Title::FreeKebab),
            24 => Ok(Title::PassiveIncome),
            25 => Ok(Title::AdrenaStakeholder),
            26 => Ok(Title::BoardMember),
            27 => Ok(Title::LiquidityKing),
            28 => Ok(Title::BadLuckBrian),
            29 => Ok(Title::LeCramer),
            30 => Ok(Title::TheChameleon),
            31 => Ok(Title::SoldierS2),
            32 => Ok(Title::SergeantS2),
            33 => Ok(Title::LieutenantS2),
            34 => Ok(Title::GeneralS2),
            35 => Ok(Title::BonkOperative),
            36 => Ok(Title::JitoJuggernaut),
            37 => Ok(Title::Season2Champion),
            38 => Ok(Title::Season2Destroyer),
            39 => Ok(Title::CrownSniffer),
            40 => Ok(Title::CertifiedMenace),
            41 => Ok(Title::TombRaider),
            42 => Ok(Title::Saboteur),
            43 => Ok(Title::Traitor),
            44 => Ok(Title::Opportunist),
            45 => Ok(Title::Relentless),
            46 => Ok(Title::WetAndLosing),
            47 => Ok(Title::Underwater),
            48 => Ok(Title::BossMuncher),
            49 => Ok(Title::Scratcher),
            50 => Ok(Title::PaperBeatRock),
            51 => Ok(Title::ThePainmaker),
            52 => Ok(Title::ChickenWings),
            53 => Ok(Title::NiceGuy),
            _ => Err("Invalid value for Title enum"),
        }
    }
}

#[derive(Copy, Clone, PartialEq, Eq, Debug, Hash)]
pub enum Wallpaper {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    VolumeKing = 5,
    Streak5 = 6,
    SoldierS2 = 7,
    SergeantS2 = 8,
    LieutenantS2 = 9,
    GeneralS2 = 10,
    BonkOperative = 11,
    JitoJuggernaut = 12,
    Season2Champion = 13,
    ThePainmaker = 14,
    NiceGuy = 15,
}

impl TryFrom<u8> for Wallpaper {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(Wallpaper::Zero),
            1 => Ok(Wallpaper::One),
            2 => Ok(Wallpaper::Two),
            3 => Ok(Wallpaper::Three),
            4 => Ok(Wallpaper::Four),
            5 => Ok(Wallpaper::VolumeKing),
            6 => Ok(Wallpaper::Streak5),
            7 => Ok(Wallpaper::SoldierS2),
            8 => Ok(Wallpaper::SergeantS2),
            9 => Ok(Wallpaper::LieutenantS2),
            10 => Ok(Wallpaper::GeneralS2),
            11 => Ok(Wallpaper::BonkOperative),
            12 => Ok(Wallpaper::JitoJuggernaut),
            13 => Ok(Wallpaper::Season2Champion),
            14 => Ok(Wallpaper::ThePainmaker),
            15 => Ok(Wallpaper::NiceGuy),
            _ => Err("Invalid value for Wallpaper enum"),
        }
    }
}

#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum ProfilePicture {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    TopTier = 5,
    WhaleAmongMen = 6,
    Streak10 = 7,
    StakedHolder = 8,
    SoldierS2 = 9,
    SergeantS2 = 10,
    LieutenantS2 = 11,
    GeneralS2 = 12,
    BonkOperative = 13,
    JitoJuggernaut = 14,
    Season2Champion = 15,
    Season2Destroyer = 16,
    Saboteur = 17,
    Traitor = 18,
    Relentless = 19,
    BossMuncher = 20,
    ThePainmaker = 21,
    NiceGuy = 22,
    GoldenHands = 23,
    DiamondHands = 24,
}

impl TryFrom<u8> for ProfilePicture {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(ProfilePicture::Zero),
            1 => Ok(ProfilePicture::One),
            2 => Ok(ProfilePicture::Two),
            3 => Ok(ProfilePicture::Three),
            4 => Ok(ProfilePicture::Four),
            5 => Ok(ProfilePicture::TopTier),
            6 => Ok(ProfilePicture::WhaleAmongMen),
            7 => Ok(ProfilePicture::Streak10),
            8 => Ok(ProfilePicture::StakedHolder),
            9 => Ok(ProfilePicture::SoldierS2),
            10 => Ok(ProfilePicture::SergeantS2),
            11 => Ok(ProfilePicture::LieutenantS2),
            12 => Ok(ProfilePicture::GeneralS2),
            13 => Ok(ProfilePicture::BonkOperative),
            14 => Ok(ProfilePicture::JitoJuggernaut),
            15 => Ok(ProfilePicture::Season2Champion),
            16 => Ok(ProfilePicture::Season2Destroyer),
            17 => Ok(ProfilePicture::Saboteur),
            18 => Ok(ProfilePicture::Traitor),
            19 => Ok(ProfilePicture::Relentless),
            20 => Ok(ProfilePicture::BossMuncher),
            21 => Ok(ProfilePicture::ThePainmaker),
            22 => Ok(ProfilePicture::NiceGuy),
            23 => Ok(ProfilePicture::GoldenHands),
            24 => Ok(ProfilePicture::DiamondHands),
            _ => Err("Invalid value for ProfilePicture enum"),
        }
    }
}

pub enum UserProfileVersion {
    V1 = 0,
    V2 = 2,
    V3 = 3,
}

impl UserProfileVersion {
    pub const fn latest() -> Self {
        UserProfileVersion::V3
    }
}

#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum Team {
    Default = 0,
    Bonk = 1,
    Jito = 2,
}

impl TryFrom<u8> for Team {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(Team::Default),
            1 => Ok(Team::Bonk),
            2 => Ok(Team::Jito),
            _ => Err("Invalid value for Team enum"),
        }
    }
}

#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum Continent {
    Default = 0,
    Europe = 1,
    NorthAmerica = 2,
    SouthAmerica = 3,
    Asia = 4,
    Africa = 5,
    Australia = 6,
    Antarctica = 7,
}

impl TryFrom<u8> for Continent {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(Continent::Default),
            1 => Ok(Continent::Europe),
            2 => Ok(Continent::NorthAmerica),
            3 => Ok(Continent::SouthAmerica),
            4 => Ok(Continent::Asia),
            5 => Ok(Continent::Africa),
            6 => Ok(Continent::Australia),
            7 => Ok(Continent::Antarctica),
            _ => Err("Invalid value for Continent enum"),
        }
    }
}

#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub enum Achievement {
    FirstTrade = 0,
    KeepADX50Percent = 1,
    KeepADX90Percent = 2,
    AwakeningRank1 = 3,
    AwakeningChallenger = 4,
    AwakeningContender = 5,
    ExpanseRank1 = 6,
    ExpanseChallenger = 7,
    ExpanseContender = 8,
    FirstProfitableTrade = 9,
    Volume1M = 10,
    Volume10M = 11,
    Volume100M = 12,
    Volume250M = 13,
    Volume500M = 14,
    Volume1B = 15,
    Loss5K = 16,
    Loss10K = 17,
    Loss50K = 18,
    Loss200K = 19,
    Loss500K = 20,
    Loss1M = 21,
    Profit5K = 22,
    Profit10K = 23,
    Profit50K = 24,
    Profit200K = 25,
    Profit500K = 26,
    Profit1M = 27,
    Streak5 = 28,
    Streak10 = 29,
    Streak20 = 30,
    StakedEarnings10 = 31,
    StakedEarnings1K = 32,
    StakedEarnings5K = 33,
    StakedEarnings10K = 34,
    StakedEarnings50K = 35,
    StakedEarnings100K = 36,
    StakedHoldings1M = 37,
    StakedHoldings3M = 38,
    StakedHoldings6M = 39,
    StakedHoldings10M = 40,
    StakedHoldings20M = 41,
    StakedHoldings50M = 42,
    Liquidity1K = 43,
    Liquidity50K = 44,
    Liquidity100K = 45,
    Liquidity250K = 46,
    Liquidity500K = 47,
    Liquidity1M = 48,
    TradeOpen30Days = 49,
    Liquidated1 = 50,
    Liquidated25 = 51,
    Liquidated50 = 52,
    Liquidated100 = 53,
    ChangeUsername10 = 54,
    Soldier = 55,
    Sergeant = 56,
    Lieutenant = 57,
    General = 58,
    BonkOperative = 59,
    JitoJuggernaut = 60,
    Season2Champion = 61,
    Season2Destroyer = 62,
    CrownSniffer = 63,
    CertifiedMenace = 64,
    TombRaider = 65,
    Saboteur = 66,
    Traitor = 67,
    Opportunist = 68,
    Relentless = 69,
    WetAndLosing = 70,
    Underwater = 71,
    BossMuncher = 72,
    Scratcher = 73,
    PaperBeatRock = 74,
    ThePainmaker = 75,
    ChickenWings = 76,
    NiceGuy = 77,
}

impl Achievement {
    /// Get the points for this achievement
    pub const fn points(&self) -> u32 {
        const POINTS_BY_ACHIEVEMENT: [u32; 78] = [
            5,   // FirstTrade
            25,  // KeepADX50Percent
            50,  // KeepADX90Percent
            25,  // AwakeningRank1
            25,  // AwakeningChallenger
            5,   // AwakeningContender
            25,  // ExpanseRank1
            25,  // ExpanseChallenger
            5,   // ExpanseContender
            5,   // FirstProfitableTrade
            5,   // Volume1M
            15,  // Volume10M
            25,  // Volume100M
            50,  // Volume250M
            100, // Volume500M
            200, // Volume1B
            5,   // Loss5K
            15,  // Loss10K
            25,  // Loss50K
            50,  // Loss200K
            100, // Loss500K
            200, // Loss1M
            5,   // Profit5K
            15,  // Profit10K
            25,  // Profit50K
            50,  // Profit200K
            100, // Profit500K
            200, // Profit1M
            10,  // Streak5
            50,  // Streak10
            200, // Streak20
            5,   // StakedEarnings10
            10,  // StakedEarnings1K
            15,  // StakedEarnings5K
            25,  // StakedEarnings10K
            50,  // StakedEarnings50K
            100, // StakedEarnings100K
            10,  // StakedHoldings1M
            15,  // StakedHoldings3M
            25,  // StakedHoldings6M
            50,  // StakedHoldings10M
            100, // StakedHoldings20M
            200, // StakedHoldings50M
            5,   // Liquidity1K
            5,   // Liquidity50K
            10,  // Liquidity100K
            10,  // Liquidity250K
            10,  // Liquidity500K
            15,  // Liquidity1M
            10,  // TradeOpen30Days
            5,   // Liquidated1
            5,   // Liquidated25
            10,  // Liquidated50
            25,  // Liquidated100
            5,   // ChangeUsername10
            5,   // Soldier S2
            15,  // Sergeant S2
            50,  // Lieutenant S2
            100, // General S2
            5,   // Bonk Operative
            5,   // Jito Juggernaut
            100, // Season 2 Champion
            25,  // Season 2 Destroyer
            50,  // Crown Sniffer
            10,  // Certified Menace
            50,  // Tomb Raider
            25,  // Saboteur
            5,   // Traitor
            25,  // Opportunist
            50,  // Relentless
            5,   // Wet and Losing
            15,  // Underwater
            15,  // Boss Muncher
            50,  // Scratcher
            100, // PaperBeatRock
            200, // The Painmaker
            15,  // ChickenWings
            100, // NiceGuy
        ];

        POINTS_BY_ACHIEVEMENT[*self as usize]
    }
}

impl TryFrom<u8> for Achievement {
    type Error = &'static str;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        match value {
            0 => Ok(Achievement::FirstTrade),
            1 => Ok(Achievement::KeepADX50Percent),
            2 => Ok(Achievement::KeepADX90Percent),
            3 => Ok(Achievement::AwakeningRank1),
            4 => Ok(Achievement::AwakeningChallenger),
            5 => Ok(Achievement::AwakeningContender),
            6 => Ok(Achievement::ExpanseRank1),
            7 => Ok(Achievement::ExpanseChallenger),
            8 => Ok(Achievement::ExpanseContender),
            9 => Ok(Achievement::FirstProfitableTrade),
            10 => Ok(Achievement::Volume1M),
            11 => Ok(Achievement::Volume10M),
            12 => Ok(Achievement::Volume100M),
            13 => Ok(Achievement::Volume250M),
            14 => Ok(Achievement::Volume500M),
            15 => Ok(Achievement::Volume1B),
            16 => Ok(Achievement::Loss5K),
            17 => Ok(Achievement::Loss10K),
            18 => Ok(Achievement::Loss50K),
            19 => Ok(Achievement::Loss200K),
            20 => Ok(Achievement::Loss500K),
            21 => Ok(Achievement::Loss1M),
            22 => Ok(Achievement::Profit5K),
            23 => Ok(Achievement::Profit10K),
            24 => Ok(Achievement::Profit50K),
            25 => Ok(Achievement::Profit200K),
            26 => Ok(Achievement::Profit500K),
            27 => Ok(Achievement::Profit1M),
            28 => Ok(Achievement::Streak5),
            29 => Ok(Achievement::Streak10),
            30 => Ok(Achievement::Streak20),
            31 => Ok(Achievement::StakedEarnings10),
            32 => Ok(Achievement::StakedEarnings1K),
            33 => Ok(Achievement::StakedEarnings5K),
            34 => Ok(Achievement::StakedEarnings10K),
            35 => Ok(Achievement::StakedEarnings50K),
            36 => Ok(Achievement::StakedEarnings100K),
            37 => Ok(Achievement::StakedHoldings1M),
            38 => Ok(Achievement::StakedHoldings3M),
            39 => Ok(Achievement::StakedHoldings6M),
            40 => Ok(Achievement::StakedHoldings10M),
            41 => Ok(Achievement::StakedHoldings20M),
            42 => Ok(Achievement::StakedHoldings50M),
            43 => Ok(Achievement::Liquidity1K),
            44 => Ok(Achievement::Liquidity50K),
            45 => Ok(Achievement::Liquidity100K),
            46 => Ok(Achievement::Liquidity250K),
            47 => Ok(Achievement::Liquidity500K),
            48 => Ok(Achievement::Liquidity1M),
            49 => Ok(Achievement::TradeOpen30Days),
            50 => Ok(Achievement::Liquidated1),
            51 => Ok(Achievement::Liquidated25),
            52 => Ok(Achievement::Liquidated50),
            53 => Ok(Achievement::Liquidated100),
            54 => Ok(Achievement::ChangeUsername10),
            55 => Ok(Achievement::Soldier),
            56 => Ok(Achievement::Sergeant),
            57 => Ok(Achievement::Lieutenant),
            58 => Ok(Achievement::General),
            59 => Ok(Achievement::BonkOperative),
            60 => Ok(Achievement::JitoJuggernaut),
            61 => Ok(Achievement::Season2Champion),
            62 => Ok(Achievement::Season2Destroyer),
            63 => Ok(Achievement::CrownSniffer),
            64 => Ok(Achievement::CertifiedMenace),
            65 => Ok(Achievement::TombRaider),
            66 => Ok(Achievement::Saboteur),
            67 => Ok(Achievement::Traitor),
            68 => Ok(Achievement::Opportunist),
            69 => Ok(Achievement::Relentless),
            70 => Ok(Achievement::WetAndLosing),
            71 => Ok(Achievement::Underwater),
            72 => Ok(Achievement::BossMuncher),
            73 => Ok(Achievement::Scratcher),
            74 => Ok(Achievement::PaperBeatRock),
            75 => Ok(Achievement::ThePainmaker),
            76 => Ok(Achievement::ChickenWings),
            77 => Ok(Achievement::NiceGuy),
            _ => Err("Invalid value for Achievement enum"),
        }
    }
}

// =============================================================================
// Cortex / Staking initialization step enums — moved here from their
// respective state files because they share the u8-backed enum pattern with
// anchor_lang::error::Error from AdrenaError::Invalid*State.
// =============================================================================

#[derive(PartialEq, Copy, Clone, Default, Debug)]
pub enum CortexInitializationStep {
    #[default]
    NotCreated = 0,
    Step1 = 1,
    Step2 = 2,
    Step3 = 3,
    Initialized = 4,
}

impl From<CortexInitializationStep> for u8 {
    fn from(val: CortexInitializationStep) -> Self {
        match val {
            CortexInitializationStep::NotCreated => 0,
            CortexInitializationStep::Step1 => 1,
            CortexInitializationStep::Step2 => 2,
            CortexInitializationStep::Step3 => 3,
            CortexInitializationStep::Initialized => 4,
        }
    }
}

impl TryFrom<u8> for CortexInitializationStep {
    type Error = anchor_lang::error::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => CortexInitializationStep::NotCreated,
            1 => CortexInitializationStep::Step1,
            2 => CortexInitializationStep::Step2,
            3 => CortexInitializationStep::Step3,
            4 => CortexInitializationStep::Initialized,
            _ => Err(AdrenaError::InvalidCortexState)?,
        })
    }
}

#[derive(PartialEq, Copy, Clone, Default, Debug)]
pub enum StakingInitializationStep {
    #[default]
    NotCreated = 0,
    Step1 = 1,
    Step2 = 2,
    Step3 = 3,
    Initialized = 4,
}

impl From<StakingInitializationStep> for u8 {
    fn from(val: StakingInitializationStep) -> Self {
        match val {
            StakingInitializationStep::NotCreated => 0,
            StakingInitializationStep::Step1 => 1,
            StakingInitializationStep::Step2 => 2,
            StakingInitializationStep::Step3 => 3,
            StakingInitializationStep::Initialized => 4,
        }
    }
}

impl TryFrom<u8> for StakingInitializationStep {
    type Error = anchor_lang::error::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => StakingInitializationStep::NotCreated,
            1 => StakingInitializationStep::Step1,
            2 => StakingInitializationStep::Step2,
            3 => StakingInitializationStep::Step3,
            4 => StakingInitializationStep::Initialized,
            _ => Err(AdrenaError::InvalidStakingState)?,
        })
    }
}
