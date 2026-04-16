/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/adrena.json`.
 */
export type Adrena = {
  "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet",
  "metadata": {
    "name": "adrena",
    "version": "2.1.0",
    "spec": "0.1.0",
    "description": "adrena",
    "repository": "https://github.com/AdrenaFoundation/adrena"
  },
  "instructions": [
    {
      "name": "acceptAdmin",
      "discriminator": [
        112,
        42,
        45,
        90,
        116,
        181,
        13,
        170
      ],
      "accounts": [
        {
          "name": "pendingAdmin",
          "docs": [
            "The pending admin must sign to accept the transfer"
          ],
          "signer": true
        },
        {
          "name": "cortex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "addCollateralLong",
      "discriminator": [
        101,
        191,
        243,
        208,
        154,
        22,
        72,
        19
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount",
            "position"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#12"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addCollateralLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "addCollateralShort",
      "discriminator": [
        197,
        235,
        47,
        1,
        228,
        10,
        200,
        184
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount",
            "position"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#12"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addCollateralShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "addCustody",
      "discriminator": [
        247,
        254,
        126,
        17,
        26,
        6,
        215,
        117
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "arg",
                "path": "params.seed"
              }
            ]
          }
        },
        {
          "name": "custodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "custody"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custodyTokenMint",
          "docs": [
            "#9"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#10"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#12"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addCustodyParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "addLimitOrder",
      "discriminator": [
        163,
        4,
        58,
        224,
        7,
        212,
        118,
        49
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "limitOrderBook",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  109,
                  105,
                  116,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114,
                  95,
                  98,
                  111,
                  111,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "collateralEscrow",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "collateralCustody"
              }
            ]
          }
        },
        {
          "name": "collateralCustodyMint",
          "docs": [
            "#8"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#9"
          ]
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#11"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "#13"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addLimitOrderParams"
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "addLiquidStake",
      "discriminator": [
        255,
        64,
        163,
        23,
        209,
        84,
        185,
        124
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount",
            "rewardTokenAccount",
            "lmTokenAccount"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#15"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#16"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#17"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#18",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#19"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#20",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#21",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#22"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#23"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#24"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#25"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addLiquidStakeParams"
            }
          }
        }
      ]
    },
    {
      "name": "addLiquidity",
      "discriminator": [
        181,
        157,
        89,
        67,
        143,
        182,
        52,
        72
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "lpTokenAccount",
          "docs": [
            "#3 Front end will target the owner account, but not limited to"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "lpStaking",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "lpTokenMint"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#8",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#13"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addLiquidityParams"
            }
          }
        }
      ]
    },
    {
      "name": "addLockedStake",
      "discriminator": [
        254,
        95,
        156,
        177,
        106,
        141,
        151,
        61
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount",
            "rewardTokenAccount"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#12"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#13",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#14"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#15",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#16",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#17"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#18"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#19"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#20"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addLockedStakeParams"
            }
          }
        }
      ]
    },
    {
      "name": "addPoolPartOne",
      "discriminator": [
        88,
        239,
        108,
        37,
        141,
        192,
        151,
        214
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "arg",
                "path": "params.name"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMintMetadata",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "mplTokenMetadataProgram",
          "docs": [
            "#10"
          ],
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#11"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "rent",
          "docs": [
            "#12"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addPoolPartOneParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "addPoolPartTwo",
      "discriminator": [
        48,
        241,
        100,
        82,
        218,
        78,
        185,
        173
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#10"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addPoolPartTwoParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "addSyntheticCustody",
      "discriminator": [
        31,
        200,
        24,
        242,
        37,
        180,
        146,
        253
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "arg",
                "path": "params.seed"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addSyntheticCustodyParams"
            }
          }
        }
      ]
    },
    {
      "name": "addVest",
      "discriminator": [
        213,
        88,
        26,
        9,
        37,
        186,
        193,
        59
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "vestRegistry",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vest",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#15"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#16"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#17"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "addVestParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "autonomMarketOpening",
      "discriminator": [
        241,
        41,
        90,
        7,
        173,
        189,
        79,
        3
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "autonomMarketOpeningParams"
            }
          }
        }
      ]
    },
    {
      "name": "cancelAdminTransfer",
      "discriminator": [
        38,
        131,
        157,
        31,
        240,
        137,
        44,
        215
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "cancelLimitOrder",
      "discriminator": [
        132,
        156,
        132,
        31,
        67,
        40,
        232,
        97
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "limitOrderBook",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  109,
                  105,
                  116,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114,
                  95,
                  98,
                  111,
                  111,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "collateralEscrow",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "collateralCustody"
              }
            ]
          }
        },
        {
          "name": "collateralCustodyMint",
          "docs": [
            "#8"
          ]
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#10"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "#12"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "cancelLimitOrderParams"
            }
          }
        }
      ]
    },
    {
      "name": "cancelStopLoss",
      "discriminator": [
        120,
        201,
        10,
        102,
        12,
        9,
        111,
        126
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "cancelTakeProfit",
      "discriminator": [
        123,
        224,
        30,
        252,
        159,
        1,
        250,
        124
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "cancelVest",
      "discriminator": [
        180,
        223,
        215,
        39,
        132,
        45,
        20,
        38
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "owner",
          "relations": [
            "vest"
          ]
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "vestRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "claimReferralFee",
      "discriminator": [
        152,
        108,
        147,
        123,
        190,
        36,
        134,
        62
      ],
      "accounts": [
        {
          "name": "referrer",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "referrer"
              }
            ]
          }
        },
        {
          "name": "referrerRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  101,
                  114,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#7"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#8"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "claimStakes",
      "discriminator": [
        254,
        140,
        24,
        53,
        197,
        234,
        35,
        121
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3"
          ],
          "writable": true,
          "relations": [
            "rewardTokenAccount",
            "lmTokenAccount"
          ]
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#5"
          ],
          "writable": true
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#15"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#16"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#17"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#18"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "claimStakesParams"
            }
          }
        }
      ]
    },
    {
      "name": "claimVest",
      "discriminator": [
        147,
        229,
        253,
        84,
        253,
        67,
        13,
        178
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "relations": [
            "vest"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "vestRegistry",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vest",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#11",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#12"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#13",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#14",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#15"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw",
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#16"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#17"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#18"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#19"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "closePositionLong",
      "discriminator": [
        50,
        66,
        35,
        214,
        218,
        31,
        152,
        68
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "writable": true,
          "relations": [
            "receivingAccount",
            "position"
          ]
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#8"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#12"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#13"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#16"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "closePositionLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "closePositionShort",
      "discriminator": [
        158,
        216,
        38,
        16,
        140,
        37,
        15,
        131
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "writable": true,
          "relations": [
            "receivingAccount",
            "position"
          ]
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#8"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#12"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#13"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#16"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "closePositionShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "deleteUserProfile",
      "discriminator": [
        24,
        82,
        133,
        212,
        73,
        243,
        46,
        137
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "user",
          "docs": [
            "#2"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "disableTokensFreezeCapabilities",
      "discriminator": [
        138,
        107,
        226,
        17,
        200,
        237,
        160,
        117
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#7"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "distributeFees",
      "discriminator": [
        120,
        56,
        27,
        7,
        53,
        176,
        113,
        186
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "Anyone can call this instruction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmStaking",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "lmStaking"
              }
            ]
          }
        },
        {
          "name": "lpStaking",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "lpTokenMint"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#7"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#9"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "lmStakingRewardTokenVault",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "lmStaking"
              }
            ]
          }
        },
        {
          "name": "lpStakingRewardTokenVault",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "lpStaking"
              }
            ]
          }
        },
        {
          "name": "referrerRewardTokenVault",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  101,
                  114,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenCustody",
          "docs": [
            "#13"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenCustodyTokenAccount",
          "docs": [
            "#15"
          ],
          "writable": true
        },
        {
          "name": "protocolFeeRecipient",
          "docs": [
            "#16"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#17"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#18"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#19"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "distributeFeesParams"
            }
          }
        }
      ]
    },
    {
      "name": "editUserProfile",
      "discriminator": [
        253,
        8,
        161,
        147,
        64,
        21,
        60,
        145
      ],
      "accounts": [
        {
          "name": "user",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#4",
            "Apply this referrer to the user profile, If none, referrer_profile is set to default"
          ],
          "optional": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "editUserProfileParams"
            }
          }
        }
      ]
    },
    {
      "name": "editUserProfileNickname",
      "discriminator": [
        132,
        19,
        244,
        18,
        78,
        181,
        31,
        50
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "userProfile",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "oldUserNickname",
          "docs": [
            "#6"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "userNickname",
          "docs": [
            "#7",
            "Use PDA to make nicknames unique"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  105,
                  99,
                  107,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "nickname"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "editUserProfileNicknameParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeLimitOrderLong",
      "discriminator": [
        114,
        251,
        178,
        6,
        238,
        31,
        245,
        245
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "collateralEscrow",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "collateralCustody"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "limitOrderBook",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  109,
                  105,
                  116,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114,
                  95,
                  98,
                  111,
                  111,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeLimitOrderLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeLimitOrderShort",
      "discriminator": [
        160,
        217,
        227,
        39,
        232,
        61,
        21,
        253
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "collateralEscrow",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "collateralCustody"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "limitOrderBook",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  109,
                  105,
                  116,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114,
                  95,
                  98,
                  111,
                  111,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeLimitOrderShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "finalizeGenesisLockCampaign",
      "discriminator": [
        53,
        212,
        137,
        237,
        78,
        217,
        150,
        203
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#6"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#7"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": []
    },
    {
      "name": "finalizeLockedStake",
      "discriminator": [
        202,
        160,
        165,
        78,
        142,
        237,
        39,
        59
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#9",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#10"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#11",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#12",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#13"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#15"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#16"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "finalizeLockedStakeParams"
            }
          }
        }
      ]
    },
    {
      "name": "genesisOtcIn",
      "discriminator": [
        250,
        84,
        122,
        89,
        253,
        185,
        57,
        186
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccountOne",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "fundingAccountTwo",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "fundingAccountThree",
          "docs": [
            "#5"
          ],
          "writable": true
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custodyOne",
          "docs": [
            "#8"
          ],
          "writable": true
        },
        {
          "name": "custodyOneTokenAccount",
          "docs": [
            "#9"
          ],
          "writable": true
        },
        {
          "name": "custodyTwo",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "custodyTwoTokenAccount",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "custodyThree",
          "docs": [
            "#12"
          ],
          "writable": true
        },
        {
          "name": "custodyThreeTokenAccount",
          "docs": [
            "#13"
          ],
          "writable": true
        },
        {
          "name": "genesisLock",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#15"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#16"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "genesisOtcInParams"
            }
          }
        }
      ]
    },
    {
      "name": "genesisOtcOut",
      "discriminator": [
        144,
        79,
        164,
        22,
        19,
        189,
        28,
        99
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "daoReceivingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custodyUsdc",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "custodyUsdcTokenAccount",
          "docs": [
            "#8"
          ],
          "writable": true
        },
        {
          "name": "genesisLock",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#10"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "genesisStakePatch",
      "discriminator": [
        225,
        99,
        136,
        6,
        108,
        202,
        18,
        97
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3"
          ],
          "relations": [
            "rewardTokenAccount",
            "lmTokenAccount"
          ]
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#5"
          ],
          "writable": true
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#13"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#15"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#16"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#17"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#18"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "getAddLiquidityAmountAndFee",
      "discriminator": [
        172,
        150,
        249,
        181,
        233,
        241,
        78,
        139
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#3",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getAddLiquidityAmountAndFeeParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "amountAndFee"
        }
      }
    },
    {
      "name": "getAssetsUnderManagement",
      "discriminator": [
        44,
        3,
        161,
        69,
        174,
        75,
        137,
        162
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getAssetsUnderManagementParams"
            }
          }
        }
      ],
      "returns": "u128"
    },
    {
      "name": "getEntryPriceAndFee",
      "discriminator": [
        134,
        30,
        231,
        199,
        83,
        72,
        27,
        99
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#3",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getEntryPriceAndFeeParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "newPositionPricesAndFee"
        }
      }
    },
    {
      "name": "getExitPriceAndFee",
      "discriminator": [
        73,
        77,
        94,
        31,
        8,
        9,
        92,
        32
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getExitPriceAndFeeParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "exitPriceAndFee"
        }
      }
    },
    {
      "name": "getLiquidationPrice",
      "discriminator": [
        73,
        174,
        119,
        65,
        149,
        5,
        73,
        239
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#5"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getLiquidationPriceParams"
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "getLiquidationState",
      "discriminator": [
        127,
        126,
        199,
        117,
        90,
        89,
        29,
        50
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getLiquidationStateParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "getLpTokenPrice",
      "discriminator": [
        71,
        172,
        21,
        25,
        176,
        168,
        60,
        10
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getLpTokenPriceParams"
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "getOpenPositionWithSwapAmountAndFees",
      "discriminator": [
        105,
        20,
        255,
        69,
        225,
        245,
        10,
        189
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "receivingCustody",
          "docs": [
            "#3",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "principalCustody",
          "docs": [
            "#6",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#7"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getOpenPositionWithSwapAmountAndFeesParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "openPositionWithSwapAmountAndFees"
        }
      }
    },
    {
      "name": "getPnl",
      "discriminator": [
        106,
        212,
        3,
        250,
        195,
        224,
        64,
        160
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getPnlParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "profitAndLoss"
        }
      }
    },
    {
      "name": "getPoolInfoSnapshot",
      "discriminator": [
        115,
        34,
        247,
        123,
        65,
        121,
        105,
        116
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getPoolInfoSnapshotParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "poolInfoSnapshot"
        }
      }
    },
    {
      "name": "getPoolInfoSnapshotPda",
      "discriminator": [
        69,
        34,
        242,
        173,
        45,
        25,
        187,
        245
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "poolInfoSnapshot",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  110,
                  97,
                  112,
                  115,
                  104,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "caller"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#7"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "getRemoveLiquidityAmountAndFee",
      "discriminator": [
        194,
        226,
        233,
        102,
        14,
        21,
        196,
        7
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#3",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getRemoveLiquidityAmountAndFeeParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "amountAndFee"
        }
      }
    },
    {
      "name": "getSwapAmountAndFees",
      "discriminator": [
        247,
        121,
        40,
        99,
        35,
        82,
        100,
        32
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "receivingCustody",
          "docs": [
            "#3",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "dispensingCustody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "getSwapAmountAndFeesParams"
            }
          }
        }
      ],
      "returns": {
        "defined": {
          "name": "swapAmountAndFees"
        }
      }
    },
    {
      "name": "grantOrRemoveAchievement",
      "discriminator": [
        31,
        192,
        107,
        213,
        24,
        175,
        248,
        248
      ],
      "accounts": [
        {
          "name": "whitelistedCaller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "userProfile",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "grantOrRemoveAchievementParams"
            }
          }
        }
      ]
    },
    {
      "name": "increasePositionLong",
      "discriminator": [
        253,
        45,
        99,
        159,
        1,
        124,
        132,
        43
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1 Must be signer or not depending",
            "if the caller is the transfer_authority (internal call for limit order) or the owner",
            ""
          ],
          "relations": [
            "position"
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#8"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#9",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10",
            "Collateral custody (stable for synthetic longs, equals `custody` for non-synthetic longs)",
            "Supports both token custodies (PDA from mint/seed) and synthetic custodies (PDA from seed)"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#12"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "increasePositionLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "increasePositionShort",
      "discriminator": [
        115,
        188,
        112,
        206,
        233,
        246,
        231,
        166
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1 Must be signer or not depending",
            "if the caller is the transfer_authority (internal call for limit order) or the owner",
            ""
          ],
          "relations": [
            "position"
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#8"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#9",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#11",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#12"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "increasePositionShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "initFourVesting",
      "discriminator": [
        3,
        142,
        244,
        213,
        166,
        217,
        186,
        48
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "vestRegistry",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#7"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#8"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initLimitOrderBook",
      "discriminator": [
        179,
        172,
        45,
        157,
        192,
        252,
        116,
        90
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "limitOrderBook",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  109,
                  105,
                  116,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114,
                  95,
                  98,
                  111,
                  111,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#4"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initOneCore",
      "discriminator": [
        244,
        243,
        65,
        251,
        99,
        235,
        237,
        78
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "protocolFeeRecipient",
          "docs": [
            "#5"
          ]
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#6"
          ]
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#10"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initOneParams"
            }
          }
        }
      ]
    },
    {
      "name": "initOracle",
      "discriminator": [
        78,
        100,
        33,
        183,
        96,
        207,
        60,
        91
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#6"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initOracleParams"
            }
          }
        }
      ]
    },
    {
      "name": "initReferrerRewardTokenVault",
      "discriminator": [
        176,
        41,
        31,
        155,
        206,
        39,
        94,
        108
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "Anyone"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "referrerRewardTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  101,
                  114,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#6"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#7"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#8"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#9"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initStakingFour",
      "discriminator": [
        12,
        112,
        94,
        2,
        114,
        242,
        65,
        25
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "stakingStakedTokenMint"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#10"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "stakingStakedTokenMint",
          "docs": [
            "#11"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#12"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [],
      "returns": "u8"
    },
    {
      "name": "initStakingOne",
      "discriminator": [
        120,
        240,
        246,
        179,
        166,
        109,
        128,
        211
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "stakingStakedTokenMint"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#8"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "stakingStakedTokenMint",
          "docs": [
            "#9"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#10"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#11"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#13"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initStakingOneParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "initStakingThree",
      "discriminator": [
        58,
        113,
        94,
        143,
        161,
        150,
        232,
        200
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#8"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#9"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#10"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [],
      "returns": "u8"
    },
    {
      "name": "initStakingTwo",
      "discriminator": [
        117,
        31,
        227,
        147,
        59,
        7,
        139,
        131
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#8"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#9"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#10"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [],
      "returns": "u8"
    },
    {
      "name": "initThreeGovernance",
      "discriminator": [
        200,
        232,
        157,
        194,
        232,
        235,
        183,
        15
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#6",
            "A realm represent one project within the governance program"
          ]
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#7"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#10"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initTwoLmTokenMetadata",
      "discriminator": [
        252,
        186,
        161,
        12,
        196,
        147,
        180,
        131
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMintMetadata",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "mplTokenMetadataProgram",
          "docs": [
            "#10"
          ],
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "rent",
          "docs": [
            "#11"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initUserProfile",
      "discriminator": [
        148,
        35,
        126,
        247,
        28,
        169,
        135,
        175
      ],
      "accounts": [
        {
          "name": "user",
          "docs": [
            "#1"
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "userNickname",
          "docs": [
            "#5",
            "Use PDA to make nicknames unique"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  105,
                  99,
                  107,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "nickname"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#6",
            "Apply this referrer to the user profile, If none, referrer_profile is set to default"
          ],
          "optional": true
        },
        {
          "name": "cortex",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initUserProfileParams"
            }
          }
        }
      ]
    },
    {
      "name": "initUserStaking",
      "discriminator": [
        49,
        77,
        246,
        16,
        254,
        90,
        29,
        206
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3"
          ],
          "relations": [
            "rewardTokenAccount",
            "lmTokenAccount"
          ]
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#5"
          ],
          "writable": true
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#9"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#13"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#14"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#16"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#17"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "liquidateLong",
      "discriminator": [
        132,
        118,
        230,
        137,
        241,
        193,
        136,
        93
      ],
      "accounts": [
        {
          "name": "signer",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#11"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "position"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#12"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#15"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "liquidateLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "liquidateShort",
      "discriminator": [
        197,
        62,
        252,
        198,
        25,
        93,
        177,
        131
      ],
      "accounts": [
        {
          "name": "signer",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#11"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "position"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#12"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#15"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "liquidateShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "migrateBorrowRateParams",
      "discriminator": [
        95,
        167,
        173,
        223,
        210,
        33,
        162,
        90
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "migrateBorrowRateParamsParams"
            }
          }
        }
      ]
    },
    {
      "name": "migrateCortexV37ToV38",
      "discriminator": [
        194,
        126,
        217,
        42,
        127,
        243,
        170,
        96
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "migrateCustodyV37ToV38",
      "discriminator": [
        211,
        235,
        171,
        146,
        116,
        206,
        71,
        244
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2",
            "Account paying for the reallocation"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#3",
            "The pool owning the custody"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "#5",
            "The custody's mint (needed for PDA derivation)"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "migrateCustodyV38ToV39",
      "discriminator": [
        232,
        50,
        146,
        156,
        202,
        71,
        167,
        26
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "The caller of this instruction (can be permissionless)"
          ],
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#2",
            "The pool owning the custody"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "custody"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "migrateOracleV38ToV39",
      "discriminator": [
        254,
        12,
        146,
        209,
        148,
        99,
        193,
        105
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1 - Permissionless caller"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2 - Account paying for reallocation"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "oracle",
          "docs": [
            "#3 - Oracle account (manual deserialization)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#4"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "migratePoolFeeDebtToSplitV38ToV39",
      "discriminator": [
        146,
        108,
        203,
        190,
        197,
        22,
        100,
        171
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "Anyone can call this instruction (permissionless)."
          ],
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "migratePoolV37ToV38",
      "discriminator": [
        217,
        93,
        167,
        97,
        238,
        100,
        140,
        139
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2",
            "Account paying for the reallocation"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#4"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "migratePoolV38ToV39",
      "discriminator": [
        111,
        139,
        195,
        102,
        94,
        1,
        11,
        105
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1",
            "Admin authority (DAO controlled)"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "migratePoolV38ToV39Params"
            }
          }
        }
      ]
    },
    {
      "name": "migratePositionV37ToV38",
      "discriminator": [
        255,
        129,
        242,
        223,
        169,
        234,
        73,
        230
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "The caller of this instruction (can be permissionless)"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2",
            "Account paying for the reallocation"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3",
            "The position owner"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#4",
            "The pool"
          ]
        },
        {
          "name": "custody",
          "docs": [
            "#5",
            "The custody"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#7"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "migratePositionV37ToV38Params"
            }
          }
        }
      ]
    },
    {
      "name": "migrateUserProfileFromV1ToV2",
      "discriminator": [
        213,
        121,
        86,
        235,
        129,
        177,
        108,
        49
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1",
            "Wallet related to the user profile"
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "userNickname",
          "docs": [
            "#5",
            "Use PDA to make nicknames unique"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  105,
                  99,
                  107,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "nickname"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#7"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#8"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "migrateUserProfileFromV1ToV2Params"
            }
          }
        }
      ]
    },
    {
      "name": "migrateVestFromV1ToV2",
      "discriminator": [
        111,
        209,
        73,
        40,
        58,
        206,
        244,
        147
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1",
            "The caller of this instruction"
          ],
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2",
            "Wallet related to the vest"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#3",
            "Account paying for the reallocation"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "vest",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#6"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "docs": [
            "#7"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "mintAllLmTokens",
      "discriminator": [
        219,
        78,
        135,
        10,
        185,
        169,
        57,
        247
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lmTokenMint"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMintMetadata",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "vestRegistry",
          "docs": [
            "#7"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#8"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "mplTokenMetadataProgram",
          "docs": [
            "#9"
          ],
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#10"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "#11"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "sysvarInstructions",
          "docs": [
            "#12"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "mintLmTokensFromBucket",
      "discriminator": [
        7,
        255,
        166,
        0,
        86,
        35,
        197,
        106
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#6"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "mintLmTokensFromBucketParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "mintStakedLmTokensFromBucket",
      "discriminator": [
        37,
        153,
        105,
        98,
        59,
        127,
        123,
        240
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#10"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#11"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "mintStakedLmTokensFromBucketParams"
            }
          }
        }
      ]
    },
    {
      "name": "openOrIncreasePositionLong",
      "discriminator": [
        32,
        214,
        230,
        112,
        201,
        7,
        118,
        230
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "fundingAccount"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6",
            "Collateral custody (stable for synthetic longs, equals `custody` for non-synthetic longs)",
            "Supports both token custodies (PDA from mint/seed) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#9"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#12"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#15"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openOrIncreasePositionParams"
            }
          }
        }
      ]
    },
    {
      "name": "openOrIncreasePositionShort",
      "discriminator": [
        98,
        163,
        165,
        78,
        141,
        104,
        75,
        85
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "fundingAccount"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#6",
            "Supports both token custodies (PDA from mint/seed) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#9"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#12"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#15"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openOrIncreasePositionParams"
            }
          }
        }
      ]
    },
    {
      "name": "openOrIncreasePositionWithSwapLong",
      "discriminator": [
        191,
        204,
        50,
        25,
        88,
        21,
        145,
        43
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "fundingAccount",
            "collateralAccount"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "collateralAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "receivingCustody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "receivingCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "principalCustody",
          "docs": [
            "#8",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "principalCustodyTokenAccount",
          "docs": [
            "#9"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#10"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#13"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#14"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#15"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#16"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#18"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openPositionWithSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "openOrIncreasePositionWithSwapShort",
      "discriminator": [
        65,
        201,
        86,
        242,
        134,
        148,
        34,
        179
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "fundingAccount",
            "collateralAccount"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "collateralAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "receivingCustody",
          "docs": [
            "#5",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "receivingCustodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#8",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#9"
          ],
          "writable": true
        },
        {
          "name": "principalCustody",
          "docs": [
            "#10",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "principalCustodyTokenAccount",
          "docs": [
            "#11"
          ]
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#12"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#15"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#16"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#17"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#18"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#19"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#20"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openPositionWithSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "openPositionLong",
      "discriminator": [
        224,
        114,
        146,
        60,
        127,
        166,
        244,
        56
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1 Must be signer or not depending",
            "if the caller is the transfer_authority (internal call for limit order) or the owner",
            ""
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#8"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#9",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10",
            "Collateral custody (stable for synthetic longs, equals `custody` for non-synthetic longs)",
            "Supports both token custodies (PDA from mint/seed) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#12"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#14"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#15"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#17"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openPositionLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "openPositionShort",
      "discriminator": [
        196,
        212,
        161,
        82,
        250,
        39,
        201,
        102
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1 Must be signer or not depending",
            "if the caller is the transfer_authority (internal call for limit order) or the owner",
            ""
          ]
        },
        {
          "name": "caller",
          "docs": [
            "#2"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "position",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#8",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#10",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#11"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#12"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "userProfile",
          "docs": [
            "#15"
          ],
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#16"
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "openPositionShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "patchCustodiesOracles",
      "discriminator": [
        150,
        248,
        194,
        18,
        193,
        152,
        67,
        25
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "usdcCustody",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  69,
                  80,
                  106,
                  70,
                  87,
                  100,
                  100,
                  53,
                  65,
                  117,
                  102,
                  113,
                  83,
                  83,
                  113,
                  101,
                  77,
                  50,
                  113,
                  78,
                  49,
                  120,
                  122,
                  121,
                  98,
                  97,
                  112,
                  67,
                  56,
                  71,
                  52,
                  119,
                  69,
                  71,
                  71,
                  107,
                  90,
                  119,
                  121,
                  84,
                  68,
                  116,
                  49,
                  118,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "bonkCustody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  68,
                  101,
                  122,
                  88,
                  65,
                  90,
                  56,
                  122,
                  55,
                  80,
                  110,
                  114,
                  110,
                  82,
                  74,
                  106,
                  122,
                  51,
                  119,
                  88,
                  66,
                  111,
                  82,
                  103,
                  105,
                  120,
                  67,
                  97,
                  54,
                  120,
                  106,
                  110,
                  66,
                  55,
                  89,
                  97,
                  66,
                  49,
                  112,
                  80,
                  66,
                  50,
                  54,
                  51,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "wbtcCustody",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  51,
                  78,
                  90,
                  57,
                  74,
                  77,
                  86,
                  66,
                  109,
                  71,
                  65,
                  113,
                  111,
                  99,
                  121,
                  98,
                  105,
                  99,
                  50,
                  99,
                  55,
                  76,
                  81,
                  67,
                  74,
                  83,
                  99,
                  109,
                  103,
                  115,
                  65,
                  90,
                  54,
                  118,
                  81,
                  113,
                  84,
                  68,
                  122,
                  99,
                  113,
                  109,
                  74,
                  104,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "jitoCustody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  74,
                  49,
                  116,
                  111,
                  115,
                  111,
                  49,
                  117,
                  67,
                  107,
                  51,
                  82,
                  76,
                  109,
                  106,
                  111,
                  114,
                  104,
                  84,
                  116,
                  114,
                  86,
                  119,
                  89,
                  57,
                  72,
                  74,
                  55,
                  88,
                  56,
                  86,
                  57,
                  121,
                  89,
                  97,
                  99,
                  54,
                  89,
                  55,
                  107,
                  71,
                  67,
                  80,
                  110,
                  34,
                  41
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "patchCustodyLockedAmount",
      "discriminator": [
        56,
        103,
        252,
        61,
        180,
        140,
        203,
        100
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "usdcCustody",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  69,
                  80,
                  106,
                  70,
                  87,
                  100,
                  100,
                  53,
                  65,
                  117,
                  102,
                  113,
                  83,
                  83,
                  113,
                  101,
                  77,
                  50,
                  113,
                  78,
                  49,
                  120,
                  122,
                  121,
                  98,
                  97,
                  112,
                  67,
                  56,
                  71,
                  52,
                  119,
                  69,
                  71,
                  71,
                  107,
                  90,
                  119,
                  121,
                  84,
                  68,
                  116,
                  49,
                  118,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "bonkCustody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  68,
                  101,
                  122,
                  88,
                  65,
                  90,
                  56,
                  122,
                  55,
                  80,
                  110,
                  114,
                  110,
                  82,
                  74,
                  106,
                  122,
                  51,
                  119,
                  88,
                  66,
                  111,
                  82,
                  103,
                  105,
                  120,
                  67,
                  97,
                  54,
                  120,
                  106,
                  110,
                  66,
                  55,
                  89,
                  97,
                  66,
                  49,
                  112,
                  80,
                  66,
                  50,
                  54,
                  51,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "wbtcCustody",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  51,
                  78,
                  90,
                  57,
                  74,
                  77,
                  86,
                  66,
                  109,
                  71,
                  65,
                  113,
                  111,
                  99,
                  121,
                  98,
                  105,
                  99,
                  50,
                  99,
                  55,
                  76,
                  81,
                  67,
                  74,
                  83,
                  99,
                  109,
                  103,
                  115,
                  65,
                  90,
                  54,
                  118,
                  81,
                  113,
                  84,
                  68,
                  122,
                  99,
                  113,
                  109,
                  74,
                  104,
                  34,
                  41
                ]
              }
            ]
          }
        },
        {
          "name": "jitoCustody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  114,
                  111,
                  109,
                  95,
                  115,
                  116,
                  114,
                  40,
                  34,
                  74,
                  49,
                  116,
                  111,
                  115,
                  111,
                  49,
                  117,
                  67,
                  107,
                  51,
                  82,
                  76,
                  109,
                  106,
                  111,
                  114,
                  104,
                  84,
                  116,
                  114,
                  86,
                  119,
                  89,
                  57,
                  72,
                  74,
                  55,
                  88,
                  56,
                  86,
                  57,
                  121,
                  89,
                  97,
                  99,
                  54,
                  89,
                  55,
                  107,
                  71,
                  67,
                  80,
                  110,
                  34,
                  41
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "proposeAdmin",
      "discriminator": [
        121,
        214,
        199,
        212,
        87,
        39,
        117,
        234
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "proposeAdminParams"
            }
          }
        }
      ]
    },
    {
      "name": "removeCollateralLong",
      "discriminator": [
        179,
        122,
        186,
        139,
        223,
        72,
        205,
        58
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "receivingAccount",
            "position"
          ]
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#11"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeCollateralLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "removeCollateralShort",
      "discriminator": [
        242,
        74,
        116,
        29,
        106,
        148,
        241,
        205
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "receivingAccount",
            "position"
          ]
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#9"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#11"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#12"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeCollateralShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "removeCustody",
      "discriminator": [
        143,
        229,
        131,
        48,
        248,
        212,
        167,
        185
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#6"
          ],
          "writable": true
        },
        {
          "name": "custodyTokenAccount",
          "docs": [
            "#7"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#8"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#9"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeCustodyParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "removeLiquidStake",
      "discriminator": [
        105,
        41,
        117,
        216,
        103,
        113,
        176,
        174
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "stakedTokenAccount",
            "lmTokenAccount",
            "rewardTokenAccount"
          ]
        },
        {
          "name": "stakedTokenAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#15"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#16"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#17",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#18"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#19",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#20",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#21"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#22"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#23"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#24"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeLiquidStakeParams"
            }
          }
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "discriminator": [
        80,
        85,
        209,
        72,
        24,
        206,
        177,
        108
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "lpTokenAccount"
          ]
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#2 Front end will target the owner account, but not limited to"
          ],
          "writable": true
        },
        {
          "name": "lpTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#7",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custodyTokenAccount",
          "docs": [
            "#9"
          ],
          "writable": true
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#12"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeLiquidityParams"
            }
          }
        }
      ]
    },
    {
      "name": "removeLockedStake",
      "discriminator": [
        198,
        147,
        178,
        249,
        220,
        14,
        164,
        33
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "lmTokenAccount",
            "stakedTokenAccount",
            "rewardTokenAccount"
          ]
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "stakedTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "stakedTokenMint",
          "docs": [
            "#15"
          ],
          "writable": true,
          "relations": [
            "staking"
          ]
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#16"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#17"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#18",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#19"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#20",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#21",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#22"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#23"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#24"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#25"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "removeLockedStakeParams"
            }
          }
        }
      ]
    },
    {
      "name": "removePool",
      "discriminator": [
        132,
        42,
        53,
        138,
        28,
        220,
        170,
        55
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [],
      "returns": "u8"
    },
    {
      "name": "resolvePositionBorrowFees",
      "discriminator": [
        220,
        145,
        23,
        255,
        234,
        9,
        41,
        145
      ],
      "accounts": [
        {
          "name": "signer",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#5"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#7"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "collateralCustody",
          "docs": [
            "#8"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "userProfile",
          "docs": [
            "#9"
          ],
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "position"
              }
            ]
          }
        },
        {
          "name": "referrerProfile",
          "docs": [
            "#10"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#11"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#12"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#13"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "resolvePositionBorrowFeesParams"
            }
          }
        }
      ]
    },
    {
      "name": "resolveStakingRound",
      "discriminator": [
        47,
        151,
        59,
        12,
        121,
        175,
        248,
        250
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#10"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#11"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#12"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "setAdmin",
      "discriminator": [
        251,
        163,
        0,
        52,
        91,
        194,
        187,
        92
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setAdminParams"
            }
          }
        }
      ]
    },
    {
      "name": "setAllPoolsFeeShares",
      "docs": [
        "Updates fee shares for ALL pools in a single instruction.",
        "Pools are passed via remaining_accounts."
      ],
      "discriminator": [
        50,
        111,
        85,
        210,
        151,
        10,
        29,
        211
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setAllPoolsFeeSharesParams"
            }
          }
        }
      ]
    },
    {
      "name": "setCustodyAllowSwap",
      "discriminator": [
        70,
        172,
        206,
        130,
        229,
        55,
        110,
        97
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyAllowSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "setCustodyAllowTrade",
      "discriminator": [
        97,
        76,
        66,
        219,
        109,
        177,
        5,
        67
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyAllowTradeParams"
            }
          }
        }
      ]
    },
    {
      "name": "setCustodyConfig",
      "discriminator": [
        133,
        97,
        130,
        143,
        215,
        229,
        36,
        176
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyConfigParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "setCustodyMaxCumulativeLongPositionSizeUsd",
      "discriminator": [
        93,
        108,
        169,
        98,
        62,
        247,
        139,
        250
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint/seed) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyMaxCumulativeLongPositionSizeUsdParams"
            }
          }
        }
      ]
    },
    {
      "name": "setCustodyMaxCumulativeShortPositionSizeUsd",
      "discriminator": [
        183,
        67,
        92,
        63,
        115,
        143,
        184,
        52
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyMaxCumulativeShortPositionSizeUsdParams"
            }
          }
        }
      ]
    },
    {
      "name": "setCustodyVirtualFunding",
      "discriminator": [
        48,
        2,
        26,
        117,
        168,
        226,
        147,
        4
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "pool",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "custody",
          "docs": [
            "#4",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "#5"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setCustodyVirtualFundingParams"
            }
          }
        }
      ],
      "returns": "u8"
    },
    {
      "name": "setPoolAllowSwap",
      "discriminator": [
        246,
        8,
        182,
        136,
        186,
        208,
        249,
        35
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolAllowSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolAllowTrade",
      "discriminator": [
        135,
        138,
        235,
        91,
        224,
        8,
        112,
        3
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolAllowTradeParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolAumSoftCapUsd",
      "discriminator": [
        124,
        194,
        30,
        229,
        89,
        235,
        94,
        38
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolAumSoftCapUsdParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolFeeConfig",
      "discriminator": [
        215,
        49,
        53,
        3,
        8,
        246,
        219,
        117
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolFeeConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolLiquidityState",
      "discriminator": [
        154,
        229,
        163,
        5,
        137,
        121,
        175,
        86
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolLiquidityStateParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolOracleConfig",
      "discriminator": [
        26,
        200,
        232,
        158,
        142,
        234,
        102,
        125
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1",
            "Admin authority (DAO controlled)"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolOracleConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolPositionExitFeeConfig",
      "discriminator": [
        83,
        224,
        152,
        18,
        111,
        247,
        64,
        93
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setPoolPositionExitFeeConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "setPoolWhitelistedSwapper",
      "discriminator": [
        164,
        104,
        239,
        240,
        105,
        120,
        245,
        213
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "whitelistedSwapper",
          "docs": [
            "#4"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "setProtocolFeeRecipient",
      "discriminator": [
        129,
        247,
        28,
        179,
        155,
        143,
        49,
        7
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "protocolFeeRecipient",
          "docs": [
            "#3"
          ]
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#4"
          ],
          "relations": [
            "cortex"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "setStakingLmEmissionPotentiometers",
      "discriminator": [
        254,
        56,
        180,
        137,
        121,
        53,
        128,
        13
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "#1"
          ],
          "signer": true,
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setStakingLmEmissionPotentiometersParams"
            }
          }
        }
      ]
    },
    {
      "name": "setStopLossLong",
      "discriminator": [
        114,
        218,
        115,
        58,
        115,
        232,
        35,
        150
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setStopLossLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "setStopLossShort",
      "discriminator": [
        91,
        5,
        98,
        54,
        75,
        233,
        9,
        236
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setStopLossShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "setTakeProfitLong",
      "discriminator": [
        149,
        97,
        30,
        150,
        50,
        205,
        12,
        173
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setTakeProfitLongParams"
            }
          }
        }
      ]
    },
    {
      "name": "setTakeProfitShort",
      "discriminator": [
        39,
        205,
        117,
        205,
        83,
        9,
        69,
        160
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "position"
          ]
        },
        {
          "name": "position",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "custody",
          "docs": [
            "#5"
          ],
          "writable": true,
          "relations": [
            "position"
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setTakeProfitShortParams"
            }
          }
        }
      ]
    },
    {
      "name": "setVestDelegate",
      "discriminator": [
        13,
        252,
        155,
        199,
        243,
        105,
        252,
        251
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "relations": [
            "vest"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "cortex",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "vest",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "#6"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setVestDelegateParams"
            }
          }
        }
      ]
    },
    {
      "name": "swap",
      "discriminator": [
        248,
        198,
        158,
        145,
        225,
        117,
        135,
        200
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#2"
          ],
          "signer": true,
          "relations": [
            "fundingAccount",
            "receivingAccount"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "receivingAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "receivingCustody",
          "docs": [
            "#8",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "receivingCustodyTokenAccount",
          "docs": [
            "#10"
          ],
          "writable": true
        },
        {
          "name": "dispensingCustody",
          "docs": [
            "#11",
            "Supports both token custodies (PDA from mint) and synthetic custodies (PDA from seed)"
          ],
          "writable": true
        },
        {
          "name": "dispensingCustodyTokenAccount",
          "docs": [
            "#12"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#13"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#14"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "swapParams"
            }
          }
        }
      ]
    },
    {
      "name": "syncUserVotingPower",
      "discriminator": [
        94,
        1,
        234,
        111,
        197,
        70,
        50,
        127
      ],
      "accounts": [
        {
          "name": "caller",
          "docs": [
            "#1"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "#2"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "#3"
          ],
          "relations": [
            "vest"
          ]
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#4"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#6"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#7"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "lmTokenMint",
          "docs": [
            "#8"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#10",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#11"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#12",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#13",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "vestRegistry",
          "docs": [
            "#14"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vest",
          "docs": [
            "#15"
          ],
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#16"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#17"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#18"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#19"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "updateOracle",
      "discriminator": [
        112,
        41,
        209,
        18,
        248,
        226,
        252,
        188
      ],
      "accounts": [
        {
          "name": "cortex",
          "docs": [
            "#1"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#2"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "updateOracleParams"
            }
          }
        }
      ]
    },
    {
      "name": "updatePoolAum",
      "discriminator": [
        10,
        125,
        230,
        234,
        157,
        184,
        236,
        241
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "cortex",
          "docs": [
            "#2"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#3"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "#4"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "lpTokenMint",
          "docs": [
            "#5"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "updatePoolAumParams"
            }
          }
        }
      ],
      "returns": "u128"
    },
    {
      "name": "upgradeLockedStake",
      "discriminator": [
        151,
        103,
        128,
        107,
        112,
        115,
        67,
        172
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "#1"
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "fundingAccount",
            "rewardTokenAccount",
            "lmTokenAccount"
          ]
        },
        {
          "name": "fundingAccount",
          "docs": [
            "#2"
          ],
          "writable": true
        },
        {
          "name": "rewardTokenAccount",
          "docs": [
            "#3"
          ],
          "writable": true
        },
        {
          "name": "lmTokenAccount",
          "docs": [
            "#4"
          ],
          "writable": true
        },
        {
          "name": "stakingStakedTokenVault",
          "docs": [
            "#5"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "stakingRewardTokenVault",
          "docs": [
            "#6"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "transferAuthority",
          "docs": [
            "#7"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userStaking",
          "docs": [
            "#8"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "staking",
          "docs": [
            "#9"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "cortex",
          "docs": [
            "#10"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  114,
                  116,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "governanceTokenMint",
          "docs": [
            "#11"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "#12"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "genesisLock",
          "docs": [
            "#13"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  101,
                  110,
                  101,
                  115,
                  105,
                  115,
                  95,
                  108,
                  111,
                  99,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lmTokenTreasury",
          "docs": [
            "#14"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  109,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "cortex"
              }
            ]
          }
        },
        {
          "name": "feeRedistributionMint",
          "docs": [
            "#15"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealm",
          "docs": [
            "#16",
            "A realm represent one project within the governance program"
          ],
          "relations": [
            "cortex"
          ]
        },
        {
          "name": "governanceRealmConfig",
          "docs": [
            "#17"
          ]
        },
        {
          "name": "governanceGoverningTokenHolding",
          "docs": [
            "#18",
            "Token account owned by governance program holding user's locked tokens"
          ],
          "writable": true
        },
        {
          "name": "governanceGoverningTokenOwnerRecord",
          "docs": [
            "#19",
            "Account owned by governance storing user information"
          ],
          "writable": true
        },
        {
          "name": "stakingLmRewardTokenVault",
          "docs": [
            "#20"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  108,
                  109,
                  95,
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staking"
              }
            ]
          }
        },
        {
          "name": "adrenaProgram",
          "docs": [
            "#21"
          ],
          "address": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
        },
        {
          "name": "governanceProgram",
          "docs": [
            "#22"
          ],
          "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
        },
        {
          "name": "systemProgram",
          "docs": [
            "#23"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "#24"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "upgradeLockedStakeParams"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "cortex",
      "discriminator": [
        143,
        120,
        192,
        142,
        209,
        42,
        159,
        192
      ]
    },
    {
      "name": "custody",
      "discriminator": [
        1,
        184,
        48,
        81,
        93,
        131,
        63,
        145
      ]
    },
    {
      "name": "genesisLock",
      "discriminator": [
        9,
        73,
        164,
        119,
        222,
        166,
        147,
        239
      ]
    },
    {
      "name": "limitOrderBook",
      "discriminator": [
        157,
        26,
        225,
        42,
        217,
        203,
        162,
        30
      ]
    },
    {
      "name": "oracle",
      "discriminator": [
        139,
        194,
        131,
        179,
        140,
        179,
        229,
        244
      ]
    },
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    },
    {
      "name": "poolInfoSnapshotPda",
      "discriminator": [
        38,
        144,
        57,
        133,
        214,
        128,
        126,
        170
      ]
    },
    {
      "name": "position",
      "discriminator": [
        170,
        188,
        143,
        228,
        122,
        64,
        247,
        208
      ]
    },
    {
      "name": "staking",
      "discriminator": [
        242,
        134,
        183,
        223,
        18,
        13,
        184,
        23
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    },
    {
      "name": "userStaking",
      "discriminator": [
        34,
        83,
        202,
        93,
        25,
        243,
        63,
        54
      ]
    },
    {
      "name": "vest",
      "discriminator": [
        45,
        204,
        95,
        56,
        150,
        233,
        97,
        231
      ]
    },
    {
      "name": "vestRegistry",
      "discriminator": [
        57,
        105,
        96,
        158,
        49,
        154,
        10,
        29
      ]
    }
  ],
  "events": [
    {
      "name": "addCollateralEvent",
      "discriminator": [
        86,
        118,
        79,
        201,
        155,
        39,
        36,
        236
      ]
    },
    {
      "name": "addLockedStakeEvent",
      "discriminator": [
        66,
        214,
        75,
        185,
        144,
        20,
        143,
        129
      ]
    },
    {
      "name": "cancelStopLossEvent",
      "discriminator": [
        217,
        94,
        158,
        148,
        24,
        126,
        41,
        63
      ]
    },
    {
      "name": "cancelTakeProfitEvent",
      "discriminator": [
        137,
        114,
        24,
        141,
        168,
        57,
        22,
        173
      ]
    },
    {
      "name": "closePositionEvent",
      "discriminator": [
        198,
        217,
        115,
        95,
        191,
        120,
        142,
        137
      ]
    },
    {
      "name": "finalizeLockedStakeEvent",
      "discriminator": [
        72,
        124,
        147,
        100,
        21,
        176,
        221,
        111
      ]
    },
    {
      "name": "increasePositionEvent",
      "discriminator": [
        245,
        113,
        85,
        52,
        214,
        187,
        153,
        132
      ]
    },
    {
      "name": "liquidateEvent",
      "discriminator": [
        158,
        94,
        144,
        4,
        147,
        52,
        5,
        255
      ]
    },
    {
      "name": "openPositionEvent",
      "discriminator": [
        83,
        43,
        164,
        147,
        169,
        87,
        81,
        172
      ]
    },
    {
      "name": "removeCollateralEvent",
      "discriminator": [
        123,
        127,
        41,
        32,
        168,
        28,
        237,
        68
      ]
    },
    {
      "name": "removeLockedStakeEvent",
      "discriminator": [
        195,
        185,
        172,
        60,
        92,
        72,
        224,
        165
      ]
    },
    {
      "name": "setStopLossEvent",
      "discriminator": [
        31,
        157,
        31,
        160,
        126,
        25,
        227,
        23
      ]
    },
    {
      "name": "setTakeProfitEvent",
      "discriminator": [
        46,
        72,
        148,
        1,
        252,
        245,
        74,
        46
      ]
    },
    {
      "name": "upgradeLockedStakeEvent",
      "discriminator": [
        47,
        163,
        41,
        116,
        38,
        163,
        237,
        195
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "mathOverflow",
      "msg": "Overflow in arithmetic operation"
    },
    {
      "code": 6001,
      "name": "unsupportedOracle",
      "msg": "Unsupported price oracle"
    },
    {
      "code": 6002,
      "name": "invalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6003,
      "name": "invalidOracleState",
      "msg": "Invalid oracle state"
    },
    {
      "code": 6004,
      "name": "staleOraclePrice",
      "msg": "Stale oracle price"
    },
    {
      "code": 6005,
      "name": "invalidOraclePrice",
      "msg": "Invalid oracle price"
    },
    {
      "code": 6006,
      "name": "invalidTimestamp",
      "msg": "Invalid oracle timestamp"
    },
    {
      "code": 6007,
      "name": "invalidOracleProvider",
      "msg": "Invalid oracle provider"
    },
    {
      "code": 6008,
      "name": "invalidEnvironment",
      "msg": "Instruction is not allowed in production"
    },
    {
      "code": 6009,
      "name": "invalidPoolLiquidityState",
      "msg": "Invalid pool liquidity state"
    },
    {
      "code": 6010,
      "name": "invalidCortexState",
      "msg": "Invalid cortex state"
    },
    {
      "code": 6011,
      "name": "invalidStakingState",
      "msg": "Invalid staking state"
    },
    {
      "code": 6012,
      "name": "invalidPoolState",
      "msg": "Invalid pool state"
    },
    {
      "code": 6013,
      "name": "invalidPoolType",
      "msg": "Invalid pool type"
    },
    {
      "code": 6014,
      "name": "invalidVestState",
      "msg": "Invalid vest state"
    },
    {
      "code": 6015,
      "name": "invalidStakeState",
      "msg": "Invalid stake state"
    },
    {
      "code": 6016,
      "name": "invalidCustody",
      "msg": "Invalid custody"
    },
    {
      "code": 6017,
      "name": "invalidCustodyAccount",
      "msg": "Invalid custody account"
    },
    {
      "code": 6018,
      "name": "invalidCustodyState",
      "msg": "Invalid custody state"
    },
    {
      "code": 6019,
      "name": "invalidCollateralCustody",
      "msg": "Invalid collateral custody"
    },
    {
      "code": 6020,
      "name": "invalidPositionState",
      "msg": "Invalid position state"
    },
    {
      "code": 6021,
      "name": "positionNotInLiquidationRange",
      "msg": "The position is not in liquidation range"
    },
    {
      "code": 6022,
      "name": "invalidStakingRoundState",
      "msg": "Invalid staking round state"
    },
    {
      "code": 6023,
      "name": "invalidAdrenaConfig",
      "msg": "Invalid adrena config"
    },
    {
      "code": 6024,
      "name": "invalidPoolConfig",
      "msg": "Invalid pool config"
    },
    {
      "code": 6025,
      "name": "invalidCustodyConfig",
      "msg": "Invalid custody config"
    },
    {
      "code": 6026,
      "name": "insufficientAmountReturned",
      "msg": "Insufficient token amount returned"
    },
    {
      "code": 6027,
      "name": "maxPriceSlippage",
      "msg": "Price slippage limit exceeded"
    },
    {
      "code": 6028,
      "name": "maxLeverage",
      "msg": "Position leverage limit exceeded"
    },
    {
      "code": 6029,
      "name": "minLeverage",
      "msg": "Position leverage under minimum"
    },
    {
      "code": 6030,
      "name": "custodyAmountLimit",
      "msg": "Custody amount limit exceeded"
    },
    {
      "code": 6031,
      "name": "positionAmountLimit",
      "msg": "Position amount limit exceeded"
    },
    {
      "code": 6032,
      "name": "tokenRatioOutOfRange",
      "msg": "Token ratio out of range"
    },
    {
      "code": 6033,
      "name": "unsupportedToken",
      "msg": "Token is not supported"
    },
    {
      "code": 6034,
      "name": "instructionNotAllowed",
      "msg": "Instruction is not allowed at this time"
    },
    {
      "code": 6035,
      "name": "maxUtilization",
      "msg": "Token utilization limit exceeded"
    },
    {
      "code": 6036,
      "name": "maxRegisteredResolvedStakingRoundReached",
      "msg": "Max registered resolved staking round reached"
    },
    {
      "code": 6037,
      "name": "invalidGovernanceProgram",
      "msg": "Governance program do not match Cortex's one"
    },
    {
      "code": 6038,
      "name": "invalidGovernanceRealm",
      "msg": "Governance realm do not match Cortex's one"
    },
    {
      "code": 6039,
      "name": "invalidVestingUnlockTime",
      "msg": "Vesting unlock time is too close or passed"
    },
    {
      "code": 6040,
      "name": "invalidStakingLockingTime",
      "msg": "Invalid staking locking time"
    },
    {
      "code": 6041,
      "name": "userStakeNotFound",
      "msg": "The user stake account specified could not be found"
    },
    {
      "code": 6042,
      "name": "invalidAccountData",
      "msg": "Invalid account data"
    },
    {
      "code": 6043,
      "name": "unresolvedStake",
      "msg": "Stake is not resolved"
    },
    {
      "code": 6044,
      "name": "bucketMintLimit",
      "msg": "Reached bucket mint limit"
    },
    {
      "code": 6045,
      "name": "genesisAlpLimitReached",
      "msg": "Genesis ALP add liquidity limit reached"
    },
    {
      "code": 6046,
      "name": "permissionlessOracleMissingSignature",
      "msg": "Permissionless oracle update must be preceded by Ed25519 signature verification instruction"
    },
    {
      "code": 6047,
      "name": "permissionlessOracleMalformedEd25519Data",
      "msg": "Ed25519 signature verification data does not match expected format"
    },
    {
      "code": 6048,
      "name": "permissionlessOracleSignerMismatch",
      "msg": "Ed25519 signature was not signed by the oracle authority"
    },
    {
      "code": 6049,
      "name": "permissionlessOracleMessageMismatch",
      "msg": "Signed message does not match instruction params"
    },
    {
      "code": 6050,
      "name": "custodyStableLockedAmountNotFound",
      "msg": "Cannot find custody stable locked amount"
    },
    {
      "code": 6051,
      "name": "custodyNotFound",
      "msg": "Cannot find custody"
    },
    {
      "code": 6052,
      "name": "insufficientBucketReserve",
      "msg": "The bucket does not contain enough token for reserving this allocation"
    },
    {
      "code": 6053,
      "name": "userNicknameTooLong",
      "msg": "User nickname exceed 24 characters"
    },
    {
      "code": 6054,
      "name": "userNicknameTooShort",
      "msg": "User nickname is less than 3 characters"
    },
    {
      "code": 6055,
      "name": "invalidGenesisLockState",
      "msg": "Invalid genesis lock state"
    },
    {
      "code": 6056,
      "name": "genesisLockCampaignFullySubscribed",
      "msg": "The campaign is fully subscribed"
    },
    {
      "code": 6057,
      "name": "poolAumSoftCapUsdReached",
      "msg": "The pool is fully subscribed"
    },
    {
      "code": 6058,
      "name": "maxRegisteredPool",
      "msg": "The number of registered pool reached max amount"
    },
    {
      "code": 6059,
      "name": "maxRegisteredCustodies",
      "msg": "The number of registered custody reached max amount"
    },
    {
      "code": 6060,
      "name": "maxCumulativeShortPositionSizeLimit",
      "msg": "The short limit for this asset has been reached"
    },
    {
      "code": 6061,
      "name": "maxCumulativeLongPositionSizeLimit",
      "msg": "The long limit for this asset has been reached"
    },
    {
      "code": 6062,
      "name": "lockedStakeArrayFull",
      "msg": "The max number of LockedStaking has been reached"
    },
    {
      "code": 6063,
      "name": "indexOutOfBounds",
      "msg": "Requested index is out of bounds"
    },
    {
      "code": 6064,
      "name": "invalidCaller",
      "msg": "The instruction must be call with a specific account as caller"
    },
    {
      "code": 6065,
      "name": "invalidBucketName",
      "msg": "Invalid bucket name"
    },
    {
      "code": 6066,
      "name": "invalidThreadId",
      "msg": "(deprecated)The provided Sablier thread does not have the expected ID"
    },
    {
      "code": 6067,
      "name": "pythPriceExponentTooLargeIncurringPrecisionLoss",
      "msg": "The exponent used for pyth price lead to high precision loss"
    },
    {
      "code": 6068,
      "name": "missingClosePositionPrice",
      "msg": "The close position price is mandatory"
    },
    {
      "code": 6069,
      "name": "invalidVoteMultiplier",
      "msg": "Invalid vote multiplier"
    },
    {
      "code": 6070,
      "name": "positionTooYoung",
      "msg": "A position cannot be close right after open or update, a slight delay is enforced"
    },
    {
      "code": 6071,
      "name": "insufficientCollateral",
      "msg": "The minimum amount of collateral posted to open a position is not met"
    },
    {
      "code": 6072,
      "name": "invalidLockDuration",
      "msg": "The provided lock duration isn't valid"
    },
    {
      "code": 6073,
      "name": "stakeNotEstablished",
      "msg": "The stake isn't established yet"
    },
    {
      "code": 6074,
      "name": "positionAlreadyClosed",
      "msg": "The position is already pending cleanup and close"
    },
    {
      "code": 6075,
      "name": "invalidLimitOrderState",
      "msg": "Invalid limit order state"
    },
    {
      "code": 6076,
      "name": "invalidWallpaperOrProfilePictureOrTitle",
      "msg": "Wallpaper or Profile Picture or Title is invalid"
    },
    {
      "code": 6077,
      "name": "invalidVersion",
      "msg": "Invalid version"
    },
    {
      "code": 6078,
      "name": "invalidVestVersion",
      "msg": "Invalid vest version"
    },
    {
      "code": 6079,
      "name": "missingOrInvalidReferrerAccount",
      "msg": "Missing or invalid referrer account"
    },
    {
      "code": 6080,
      "name": "wallpaperNotUnlocked",
      "msg": "The requested wallpaper has not been unlocked by this user"
    },
    {
      "code": 6081,
      "name": "profilePictureNotUnlocked",
      "msg": "The requested profile picture has not been unlocked by this user"
    },
    {
      "code": 6082,
      "name": "titleNotUnlocked",
      "msg": "The requested title has not been unlocked by this user"
    },
    {
      "code": 6083,
      "name": "invalidAchievement",
      "msg": "Invalid achievement ID"
    },
    {
      "code": 6084,
      "name": "userNicknameInvalidFormat",
      "msg": "User nickname expected format: Monster followed by digits"
    },
    {
      "code": 6085,
      "name": "invalidContinentOrTeam",
      "msg": "Continent or Team is invalid"
    },
    {
      "code": 6086,
      "name": "teamImmutable",
      "msg": "The team can not be changed after being already set"
    },
    {
      "code": 6087,
      "name": "invalidSigner",
      "msg": "Invalid signer"
    },
    {
      "code": 6088,
      "name": "missingOraclePrice",
      "msg": "Missing at least one oracle price"
    },
    {
      "code": 6089,
      "name": "invalidOracleSignature",
      "msg": "Invalid oracle signature"
    },
    {
      "code": 6090,
      "name": "custodyBelowMinimum",
      "msg": "Custody amount is below minimum required"
    },
    {
      "code": 6091,
      "name": "custodyAlreadyMigrated",
      "msg": "Custody borrow rate params already migrated"
    },
    {
      "code": 6092,
      "name": "invalidFeedId",
      "msg": "Invalid feed id"
    },
    {
      "code": 6093,
      "name": "noOracleEmptySlotFound",
      "msg": "No empty oracle slot found"
    },
    {
      "code": 6094,
      "name": "invalidMarketOpeningData",
      "msg": "Invalid market opening data"
    },
    {
      "code": 6095,
      "name": "invalidFeeDistribution",
      "msg": "Invalid fee distribution"
    },
    {
      "code": 6096,
      "name": "marketIsClosed",
      "msg": "Market is closed"
    },
    {
      "code": 6097,
      "name": "marketStockSpecialEvent",
      "msg": "Position is affected by a stock split or dividend event"
    },
    {
      "code": 6098,
      "name": "switchboardMissingAccounts",
      "msg": "Missing Switchboard remaining accounts"
    },
    {
      "code": 6099,
      "name": "switchboardInvalidQuoteAccount",
      "msg": "Invalid Switchboard quote account"
    },
    {
      "code": 6100,
      "name": "switchboardInvalidQueue",
      "msg": "Switchboard quote account queue does not match expected queue"
    },
    {
      "code": 6101,
      "name": "switchboardMalformedQuoteData",
      "msg": "Malformed Switchboard quote account data"
    },
    {
      "code": 6102,
      "name": "switchboardQuoteTooStale",
      "msg": "Switchboard quote is stale"
    },
    {
      "code": 6103,
      "name": "switchboardFeedMappingMissing",
      "msg": "Missing Switchboard feed mapping"
    },
    {
      "code": 6104,
      "name": "switchboardFeedMappingDuplicate",
      "msg": "Duplicate Switchboard feed mapping or duplicate feed update"
    },
    {
      "code": 6105,
      "name": "adminTransferTooEarly",
      "msg": "Admin transfer delay has not elapsed"
    },
    {
      "code": 6106,
      "name": "invalidArgument",
      "msg": "Invalid argument"
    },
    {
      "code": 6107,
      "name": "liquidationPausedNoBackupOracle",
      "msg": "Liquidation paused: no backup oracle has fresh price for this asset"
    },
    {
      "code": 6108,
      "name": "liquidationPausedCircuitBreaker",
      "msg": "Liquidation paused: backup oracle infrastructure is down"
    }
  ],
  "types": [
    {
      "name": "addCollateralEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "addAmountUsd",
            "type": "u64"
          },
          {
            "name": "newCollateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "addCollateralLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "addCollateralShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "addCustodyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isStable",
            "type": "bool"
          },
          {
            "name": "pricing",
            "type": {
              "defined": {
                "name": "pricingParams"
              }
            }
          },
          {
            "name": "allowSwap",
            "type": "bool"
          },
          {
            "name": "allowTrade",
            "type": "bool"
          },
          {
            "name": "fees",
            "type": {
              "defined": {
                "name": "fees"
              }
            }
          },
          {
            "name": "borrowRate",
            "type": {
              "defined": {
                "name": "borrowRateParams"
              }
            }
          },
          {
            "name": "ratios",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tokenRatios"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "oracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "tradeOracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "seed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "addLimitOrderParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "triggerPrice",
            "type": "u64"
          },
          {
            "name": "limitPrice",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "addLiquidStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "addLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minLpAmountOut",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "addLockedStakeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "staking",
            "type": "pubkey"
          },
          {
            "name": "lockedStakeId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lockedDays",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "addLockedStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lockedDays",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "addPoolPartOneParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "aumSoftCapUsd",
            "type": "u64"
          },
          {
            "name": "lpTokenName",
            "type": "string"
          },
          {
            "name": "lpTokenSymbol",
            "type": "string"
          },
          {
            "name": "lpTokenUri",
            "type": "string"
          },
          {
            "name": "poolType",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "oracleProvider",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "managerFeeRecipient",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "addPoolPartTwoParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "genesisLockCampaignDuration",
            "type": "i64"
          },
          {
            "name": "genesisReservedGrantDuration",
            "type": "i64"
          },
          {
            "name": "genesisLockCampaignStartDate",
            "type": "i64"
          },
          {
            "name": "reservedSpots",
            "type": {
              "defined": {
                "name": "reservedSpots"
              }
            }
          }
        ]
      }
    },
    {
      "name": "addSyntheticCustodyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pricing",
            "type": {
              "defined": {
                "name": "pricingParams"
              }
            }
          },
          {
            "name": "allowSwap",
            "type": "bool"
          },
          {
            "name": "allowTrade",
            "type": "bool"
          },
          {
            "name": "fees",
            "type": {
              "defined": {
                "name": "fees"
              }
            }
          },
          {
            "name": "borrowRate",
            "type": {
              "defined": {
                "name": "borrowRateParams"
              }
            }
          },
          {
            "name": "tradeOracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "tradeOracleFeedId",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "addVestParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "originBucket",
            "type": "u8"
          },
          {
            "name": "unlockStartTimestamp",
            "type": "i64"
          },
          {
            "name": "unlockEndTimestamp",
            "type": "i64"
          },
          {
            "name": "voteMultiplier",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "amountAndFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "assets",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "owned",
            "type": "u64"
          },
          {
            "name": "locked",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "autonomMarketOpeningData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeds",
            "type": "bytes"
          },
          {
            "name": "marketCloseAffectedFeeds",
            "type": "bytes"
          },
          {
            "name": "marketOpenTimestamp",
            "type": "i64"
          },
          {
            "name": "marketCloseTimestamp",
            "type": "i64"
          },
          {
            "name": "signature",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "recoveryId",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "autonomMarketOpeningParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "openingData",
            "type": {
              "defined": {
                "name": "autonomMarketOpeningData"
              }
            }
          }
        ]
      }
    },
    {
      "name": "batchPrices",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "prices",
            "type": {
              "vec": {
                "defined": {
                  "name": "priceData"
                }
              }
            }
          },
          {
            "name": "signature",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "recoveryId",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "batchPricesWithProvider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "provider",
            "type": "u8"
          },
          {
            "name": "batch",
            "type": {
              "defined": {
                "name": "batchPrices"
              }
            }
          }
        ]
      }
    },
    {
      "name": "borrowRateParams",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxHourlyBorrowInterestRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "borrowRateState",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentRate",
            "type": "u64"
          },
          {
            "name": "lastUpdate",
            "type": "i64"
          },
          {
            "name": "cumulativeInterest",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          }
        ]
      }
    },
    {
      "name": "cancelLimitOrderParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "cancelStopLossEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "positionSide",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "cancelTakeProfitEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "positionSide",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "claimStakesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockedStakeIndexes",
            "type": {
              "option": "bytes"
            }
          }
        ]
      }
    },
    {
      "name": "closePositionEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "profitUsd",
            "type": "u64"
          },
          {
            "name": "lossUsd",
            "type": "u64"
          },
          {
            "name": "borrowFeeUsd",
            "type": "u64"
          },
          {
            "name": "exitFeeUsd",
            "type": "u64"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "percentage",
            "type": "u64"
          },
          {
            "name": "fundingPaidUsd",
            "type": "u64"
          },
          {
            "name": "fundingReceivedUsd",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "closePositionLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          },
          {
            "name": "percentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "closePositionShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          },
          {
            "name": "percentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "cortex",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "transferAuthorityBump",
            "type": "u8"
          },
          {
            "name": "lmTokenBump",
            "type": "u8"
          },
          {
            "name": "governanceTokenBump",
            "type": "u8"
          },
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "feeConversionDecimals",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "lmTokenMint",
            "type": "pubkey"
          },
          {
            "name": "inceptionTime",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "feeRedistributionMint",
            "type": "pubkey"
          },
          {
            "name": "protocolFeeRecipient",
            "type": "pubkey"
          },
          {
            "name": "pools",
            "type": {
              "array": [
                "pubkey",
                4
              ]
            }
          },
          {
            "name": "userProfilesCount",
            "type": "u64"
          },
          {
            "name": "governanceProgram",
            "type": "pubkey"
          },
          {
            "name": "governanceRealm",
            "type": "pubkey"
          },
          {
            "name": "coreContributorBucketAllocation",
            "type": "u64"
          },
          {
            "name": "foundationBucketAllocation",
            "type": "u64"
          },
          {
            "name": "ecosystemBucketAllocation",
            "type": "u64"
          },
          {
            "name": "coreContributorBucketVestedAmount",
            "type": "u64"
          },
          {
            "name": "coreContributorBucketMintedAmount",
            "type": "u64"
          },
          {
            "name": "foundationBucketVestedAmount",
            "type": "u64"
          },
          {
            "name": "foundationBucketMintedAmount",
            "type": "u64"
          },
          {
            "name": "ecosystemBucketVestedAmount",
            "type": "u64"
          },
          {
            "name": "ecosystemBucketMintedAmount",
            "type": "u64"
          },
          {
            "name": "genesisLiquidityAlpAmount",
            "type": "u64"
          },
          {
            "name": "uniquePositionIdCounter",
            "type": "u64"
          },
          {
            "name": "pendingAdmin",
            "type": "pubkey"
          },
          {
            "name": "adminTransferRequestTime",
            "type": "i64"
          },
          {
            "name": "adminTransferMinDelaySeconds",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "custody",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tokenAccountBump",
            "type": "u8"
          },
          {
            "name": "allowTrade",
            "type": "u8"
          },
          {
            "name": "allowSwap",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "isStable",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "tokenAccount",
            "type": "pubkey"
          },
          {
            "name": "oracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "tradeOracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "pricing",
            "type": {
              "defined": {
                "name": "pricingParams"
              }
            }
          },
          {
            "name": "fees",
            "type": {
              "defined": {
                "name": "fees"
              }
            }
          },
          {
            "name": "borrowRate",
            "type": {
              "defined": {
                "name": "borrowRateParams"
              }
            }
          },
          {
            "name": "collectedFees",
            "type": {
              "defined": {
                "name": "feesStats"
              }
            }
          },
          {
            "name": "volumeStats",
            "type": {
              "defined": {
                "name": "volumeStats"
              }
            }
          },
          {
            "name": "tradeStats",
            "type": {
              "defined": {
                "name": "tradeStats"
              }
            }
          },
          {
            "name": "assets",
            "type": {
              "defined": {
                "name": "assets"
              }
            }
          },
          {
            "name": "longPositions",
            "type": {
              "defined": {
                "name": "positionsAccounting"
              }
            }
          },
          {
            "name": "shortPositions",
            "type": {
              "defined": {
                "name": "positionsAccounting"
              }
            }
          },
          {
            "name": "borrowRateState",
            "type": {
              "defined": {
                "name": "borrowRateState"
              }
            }
          },
          {
            "name": "optimalUtilizationBps",
            "type": "u64"
          },
          {
            "name": "virtualFunding",
            "type": {
              "defined": {
                "name": "virtualFundingParams"
              }
            }
          },
          {
            "name": "virtualFundingState",
            "type": {
              "defined": {
                "name": "virtualFundingState"
              }
            }
          },
          {
            "name": "isSynthetic",
            "type": "u8"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "oracleFeedId",
            "type": "u8"
          },
          {
            "name": "tradeOracleFeedId",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "paddingAutonom0",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          },
          {
            "name": "paddingAutonom1",
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "custodyInfoSnapshot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetsValueUsd",
            "type": "u64"
          },
          {
            "name": "owned",
            "type": "u64"
          },
          {
            "name": "locked",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "priceConfidence",
            "type": "u64"
          },
          {
            "name": "tradePrice",
            "type": "u64"
          },
          {
            "name": "tradePriceConfidence",
            "type": "u64"
          },
          {
            "name": "shortPnl",
            "type": "i64"
          },
          {
            "name": "longPnl",
            "type": "i64"
          },
          {
            "name": "openInterestLongUsd",
            "type": "u64"
          },
          {
            "name": "openInterestShortUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeProfitUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLossUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeSwapFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidityFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeClosePositionFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidationFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeBorrowFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeTradingVolumeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "custodyInfoSnapshotPda",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetsValueUsd",
            "type": "u64"
          },
          {
            "name": "owned",
            "type": "u64"
          },
          {
            "name": "locked",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "tradePrice",
            "type": "u64"
          },
          {
            "name": "shortPnl",
            "type": "i64"
          },
          {
            "name": "longPnl",
            "type": "i64"
          },
          {
            "name": "openInterestLongUsd",
            "type": "u64"
          },
          {
            "name": "openInterestShortUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeProfitUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLossUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeSwapFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidityFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeClosePositionFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidationFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeBorrowFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeTradingVolumeUsd",
            "type": "u64"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "distributeFeesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "editUserProfileNicknameParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nickname",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "editUserProfileParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profilePicture",
            "type": "u8"
          },
          {
            "name": "wallpaper",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "u8"
          },
          {
            "name": "team",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "continent",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "executeLimitOrderLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "executeLimitOrderShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "exitPriceAndFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "profitUsd",
            "type": "u64"
          },
          {
            "name": "lossUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "fees",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapIn",
            "type": "u16"
          },
          {
            "name": "swapOut",
            "type": "u16"
          },
          {
            "name": "stableSwapIn",
            "type": "u16"
          },
          {
            "name": "stableSwapOut",
            "type": "u16"
          },
          {
            "name": "addLiquidity",
            "type": "u16"
          },
          {
            "name": "removeLiquidity",
            "type": "u16"
          },
          {
            "name": "closePosition",
            "type": "u16"
          },
          {
            "name": "liquidation",
            "type": "u16"
          },
          {
            "name": "feeMax",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          },
          {
            "name": "padding2",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "feesStats",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapUsd",
            "type": "u64"
          },
          {
            "name": "addLiquidityUsd",
            "type": "u64"
          },
          {
            "name": "removeLiquidityUsd",
            "type": "u64"
          },
          {
            "name": "closePositionUsd",
            "type": "u64"
          },
          {
            "name": "liquidationUsd",
            "type": "u64"
          },
          {
            "name": "borrowUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "finalizeLockedStakeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "staking",
            "type": "pubkey"
          },
          {
            "name": "lockedStakeId",
            "type": "u64"
          },
          {
            "name": "earlyExit",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "finalizeLockedStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockedStakeId",
            "type": "u64"
          },
          {
            "name": "earlyExit",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "genesisLock",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "hasTransitionedToFullyPublic",
            "type": "u8"
          },
          {
            "name": "hasCompletedOtcIn",
            "type": "u8"
          },
          {
            "name": "hasCompletedOtcOut",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          },
          {
            "name": "campaignDuration",
            "type": "i64"
          },
          {
            "name": "reservedGrantDuration",
            "type": "i64"
          },
          {
            "name": "campaignStartDate",
            "type": "i64"
          },
          {
            "name": "publicAmount",
            "type": "u64"
          },
          {
            "name": "reservedAmount",
            "type": "u64"
          },
          {
            "name": "publicAmountClaimed",
            "type": "u64"
          },
          {
            "name": "reservedAmountClaimed",
            "type": "u64"
          },
          {
            "name": "reservedGrantOwners",
            "type": {
              "array": [
                "pubkey",
                43
              ]
            }
          },
          {
            "name": "reservedGrantAmounts",
            "type": {
              "array": [
                "u64",
                43
              ]
            }
          },
          {
            "name": "paddingUnsafe",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "genesisOtcInParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "custodyOneAmount",
            "type": "u64"
          },
          {
            "name": "custodyTwoAmount",
            "type": "u64"
          },
          {
            "name": "custodyThreeAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "getAddLiquidityAmountAndFeeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getAssetsUnderManagementParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getEntryPriceAndFeeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getExitPriceAndFeeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getLiquidationPriceParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "addCollateral",
            "type": "u64"
          },
          {
            "name": "removeCollateral",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getLiquidationStateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getLpTokenPriceParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getOpenPositionWithSwapAmountAndFeesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralAmount",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getPnlParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getPoolInfoSnapshotParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getRemoveLiquidityAmountAndFeeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lpAmountIn",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "getSwapAmountAndFeesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "grantOrRemoveAchievementParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "achievements",
            "type": "bytes"
          },
          {
            "name": "operation",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "increasePositionEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "increasePositionLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "increasePositionShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "initOneParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "coreContributorBucketAllocation",
            "type": "u64"
          },
          {
            "name": "foundationBucketAllocation",
            "type": "u64"
          },
          {
            "name": "ecosystemBucketAllocation",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "initOracleParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "vec": {
                "defined": {
                  "name": "oraclePricesSetup"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "initStakingOneParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakingType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "initUserProfileParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nickname",
            "type": "string"
          },
          {
            "name": "profilePicture",
            "type": "u8"
          },
          {
            "name": "wallpaper",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "u8"
          },
          {
            "name": "team",
            "type": "u8"
          },
          {
            "name": "continent",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "limitOrder",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "triggerPrice",
            "type": "u64"
          },
          {
            "name": "limitPrice",
            "type": "u64"
          },
          {
            "name": "custody",
            "type": "pubkey"
          },
          {
            "name": "collateralCustody",
            "type": "pubkey"
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "isLimitPriceSet",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "limitOrderBook",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "registeredLimitOrderCount",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "limitOrders",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "limitOrder"
                  }
                },
                16
              ]
            }
          },
          {
            "name": "escrowedLamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "limitedString",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": {
              "array": [
                "u8",
                31
              ]
            }
          },
          {
            "name": "length",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "liquidStake",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          },
          {
            "name": "claimTime",
            "type": "i64"
          },
          {
            "name": "overlapTime",
            "type": "i64"
          },
          {
            "name": "overlapAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "lossUsd",
            "type": "u64"
          },
          {
            "name": "borrowFeeUsd",
            "type": "u64"
          },
          {
            "name": "exitFeeUsd",
            "type": "u64"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "fundingPaidUsd",
            "type": "u64"
          },
          {
            "name": "fundingReceivedUsd",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          },
          {
            "name": "confiscatedCollateralUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidateLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "liquidateShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "lockedStake",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          },
          {
            "name": "claimTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "lockDuration",
            "type": "u64"
          },
          {
            "name": "rewardMultiplier",
            "type": "u32"
          },
          {
            "name": "lmRewardMultiplier",
            "type": "u32"
          },
          {
            "name": "voteMultiplier",
            "type": "u32"
          },
          {
            "name": "qualifiedForRewardsInResolvedRoundCount",
            "type": "u32"
          },
          {
            "name": "amountWithRewardMultiplier",
            "type": "u64"
          },
          {
            "name": "amountWithLmRewardMultiplier",
            "type": "u64"
          },
          {
            "name": "resolved",
            "type": "u8"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "earlyExit",
            "type": "u8"
          },
          {
            "name": "padding3",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "earlyExitFee",
            "type": "u64"
          },
          {
            "name": "isGenesis",
            "type": "u8"
          },
          {
            "name": "padding4",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "genesisClaimTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "migrateBorrowRateParamsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "optimalUtilization",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "migratePoolV38ToV39Params",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "managerFeeRecipient",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "migratePositionV37ToV38Params",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "side",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "migrateUserProfileFromV1ToV2Params",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nickname",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintLmTokensFromBucketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bucketName",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "reason",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintStakedLmTokensFromBucketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bucketName",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "reason",
            "type": "string"
          },
          {
            "name": "lockedDays",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "multiBatchPrices",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "batches",
            "type": {
              "vec": {
                "defined": {
                  "name": "batchPricesWithProvider"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "multiOracleConfig",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "providers",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "minAgree",
            "type": "u8"
          },
          {
            "name": "priceDiffThresholdBps",
            "type": "u16"
          },
          {
            "name": "stalenessSeconds",
            "type": "u16"
          },
          {
            "name": "asymmetricLiquidation",
            "type": "u8"
          },
          {
            "name": "circuitBreakerEnabled",
            "type": "u8"
          },
          {
            "name": "circuitBreakerSeconds",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                68
              ]
            }
          }
        ]
      }
    },
    {
      "name": "newPositionPricesAndFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entryPrice",
            "type": "u64"
          },
          {
            "name": "liquidationPrice",
            "type": "u64"
          },
          {
            "name": "exitFee",
            "type": "u64"
          },
          {
            "name": "liquidationFee",
            "type": "u64"
          },
          {
            "name": "size",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "nextStakingRound",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStake",
            "type": "u64"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "lmTotalStake",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "openOrIncreasePositionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "openPositionEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "openPositionLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "openPositionShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "openPositionWithSwapAmountAndFees",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entryPrice",
            "type": "u64"
          },
          {
            "name": "liquidationPrice",
            "type": "u64"
          },
          {
            "name": "swapFeeIn",
            "type": "u64"
          },
          {
            "name": "swapFeeOut",
            "type": "u64"
          },
          {
            "name": "exitFee",
            "type": "u64"
          },
          {
            "name": "liquidationFee",
            "type": "u64"
          },
          {
            "name": "size",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "openPositionWithSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "collateral",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "oracle",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "registeredPricesCount",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "prices",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "oraclePrice"
                  }
                },
                50
              ]
            }
          }
        ]
      }
    },
    {
      "name": "oraclePrice",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "confidence",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "feedId",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "name",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          }
        ]
      }
    },
    {
      "name": "oraclePricesSetup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "feedId",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "pool",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lpTokenBump",
            "type": "u8"
          },
          {
            "name": "nbStableCustody",
            "type": "u8"
          },
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "allowTrade",
            "type": "u8"
          },
          {
            "name": "allowSwap",
            "type": "u8"
          },
          {
            "name": "liquidityState",
            "type": "u8"
          },
          {
            "name": "registeredCustodyCount",
            "type": "u8"
          },
          {
            "name": "name",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "custodies",
            "type": {
              "array": [
                "pubkey",
                8
              ]
            }
          },
          {
            "name": "feesDebtUsd",
            "type": "u64"
          },
          {
            "name": "referrersFeeDebtUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeReferrerFeeUsd",
            "type": "u64"
          },
          {
            "name": "lpTokenPriceUsd",
            "type": "u64"
          },
          {
            "name": "whitelistedSwapper",
            "type": "pubkey"
          },
          {
            "name": "ratios",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tokenRatios"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "lastAumAndLpTokenPriceUsdUpdate",
            "type": "i64"
          },
          {
            "name": "uniqueLimitOrderIdCounter",
            "type": "u64"
          },
          {
            "name": "aumUsd",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "inceptionTime",
            "type": "i64"
          },
          {
            "name": "aumSoftCapUsd",
            "type": "u64"
          },
          {
            "name": "positionExitFeeConfig",
            "type": {
              "defined": {
                "name": "positionExitFeeConfig"
              }
            }
          },
          {
            "name": "lastLpDepositTime",
            "type": "i64"
          },
          {
            "name": "poolType",
            "type": "u8"
          },
          {
            "name": "oracleProvider",
            "type": "u8"
          },
          {
            "name": "registeredSyntheticCustodyCount",
            "type": "u8"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          },
          {
            "name": "marketOpenTimestamp",
            "type": "i64"
          },
          {
            "name": "marketCloseTimestamp",
            "type": "i64"
          },
          {
            "name": "marketCloseEventTimestamp",
            "type": "i64"
          },
          {
            "name": "marketCloseAffectedFeeds",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "lpFeeShareBps",
            "type": "u16"
          },
          {
            "name": "lmFeeShareBps",
            "type": "u16"
          },
          {
            "name": "referrerFeeShareBps",
            "type": "u16"
          },
          {
            "name": "protocolFeeShareBps",
            "type": "u16"
          },
          {
            "name": "managerFeeShareBps",
            "type": "u16"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          },
          {
            "name": "managerFeeRecipient",
            "type": "pubkey"
          },
          {
            "name": "managerFeeDebtUsd",
            "type": "u64"
          },
          {
            "name": "lmFeeDebtUsd",
            "type": "u64"
          },
          {
            "name": "protocolFeeDebtUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeProtocolFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLmFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeManagerFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLpFeeUsd",
            "type": "u64"
          },
          {
            "name": "multiOracleConfig",
            "type": {
              "defined": {
                "name": "multiOracleConfig"
              }
            }
          },
          {
            "name": "syntheticCustodies",
            "type": {
              "array": [
                "pubkey",
                32
              ]
            }
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u8",
                704
              ]
            }
          }
        ]
      }
    },
    {
      "name": "poolInfoSnapshot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentTime",
            "type": "u64"
          },
          {
            "name": "aumUsd",
            "type": "u64"
          },
          {
            "name": "lpTokenPrice",
            "type": "u64"
          },
          {
            "name": "custodiesInfoSnapshot",
            "type": {
              "vec": {
                "defined": {
                  "name": "custodyInfoSnapshot"
                }
              }
            }
          },
          {
            "name": "lpCirculatingSupply",
            "type": "u64"
          },
          {
            "name": "cumulativeReferrerFeeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolInfoSnapshotPda",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "currentTime",
            "type": "i64"
          },
          {
            "name": "aumUsd",
            "type": "u64"
          },
          {
            "name": "lpTokenPrice",
            "type": "u64"
          },
          {
            "name": "custodiesInfoSnapshot",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "custodyInfoSnapshotPda"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "syntheticCustodiesInfoSnapshot",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "syntheticCustodyInfoSnapshotPda"
                  }
                },
                32
              ]
            }
          },
          {
            "name": "lpCirculatingSupply",
            "type": "u64"
          },
          {
            "name": "cumulativeReferrerFeeUsd",
            "type": "u64"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                120
              ]
            }
          }
        ]
      }
    },
    {
      "name": "position",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "takeProfitIsSet",
            "type": "u8"
          },
          {
            "name": "stopLossIsSet",
            "type": "u8"
          },
          {
            "name": "paddingUnsafe",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "custody",
            "type": "pubkey"
          },
          {
            "name": "collateralCustody",
            "type": "pubkey"
          },
          {
            "name": "openTime",
            "type": "i64"
          },
          {
            "name": "updateTime",
            "type": "i64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "borrowSizeUsd",
            "type": "u64"
          },
          {
            "name": "collateralUsd",
            "type": "u64"
          },
          {
            "name": "unrealizedInterestUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeInterestSnapshot",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "lockedAmount",
            "type": "u64"
          },
          {
            "name": "collateralAmount",
            "type": "u64"
          },
          {
            "name": "exitFeeUsd",
            "type": "u64"
          },
          {
            "name": "liquidationFeeUsd",
            "type": "u64"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "takeProfitLimitPrice",
            "type": "u64"
          },
          {
            "name": "paidInterestUsd",
            "type": "u64"
          },
          {
            "name": "stopLossLimitPrice",
            "type": "u64"
          },
          {
            "name": "stopLossClosePositionPrice",
            "type": "u64"
          },
          {
            "name": "cumulativeLongToShortSnapshot",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "cumulativeShortToLongSnapshot",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "unrealizedFundingPaidUsd",
            "type": "u64"
          },
          {
            "name": "unrealizedFundingReceivedUsd",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "positionExitFeeConfig",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "enabled",
            "type": "u8"
          },
          {
            "name": "padding0",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "minPositionOpenTimeSeconds",
            "type": "u64"
          },
          {
            "name": "minPositionUpdateTimeBeforeCloseSeconds",
            "type": "u64"
          },
          {
            "name": "ageTier1Seconds",
            "type": "u64"
          },
          {
            "name": "ageTier2Seconds",
            "type": "u64"
          },
          {
            "name": "ageTier3Seconds",
            "type": "u64"
          },
          {
            "name": "multiplierTier1Bps",
            "type": "u32"
          },
          {
            "name": "multiplierTier2Bps",
            "type": "u32"
          },
          {
            "name": "multiplierTier3Bps",
            "type": "u32"
          },
          {
            "name": "multiplierAfterTier3Bps",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "positionsAccounting",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "openPositions",
            "type": "u64"
          },
          {
            "name": "sizeUsd",
            "type": "u64"
          },
          {
            "name": "borrowSizeUsd",
            "type": "u64"
          },
          {
            "name": "lockedAmount",
            "type": "u64"
          },
          {
            "name": "weightedPrice",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "totalQuantity",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "cumulativeFundingPaidUsd",
            "type": "u64"
          },
          {
            "name": "collateralUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeInterestSnapshot",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "exitFeeUsd",
            "type": "u64"
          },
          {
            "name": "stableLockedAmount",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "stableLockedAmountStat"
                  }
                },
                1
              ]
            }
          },
          {
            "name": "prepaidInterestUsd",
            "type": "u64"
          },
          {
            "name": "tmpOffsetEndTs",
            "type": "u64"
          },
          {
            "name": "tmpOffset",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "unrealizedInterestUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeFundingReceivedUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceData",
      "docs": [
        "Individual price data within a batch."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "pricingParams",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxInitialLeverage",
            "type": "u32"
          },
          {
            "name": "maxLeverage",
            "type": "u32"
          },
          {
            "name": "maxPositionLockedUsd",
            "type": "u64"
          },
          {
            "name": "maxCumulativeShortPositionSizeUsd",
            "type": "u64"
          },
          {
            "name": "maxCumulativeLongPositionSizeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "profitAndLoss",
      "docs": [
        "Specific to the codebase, this struct is used to store the profit and loss of a position."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profitUsd",
            "type": "u64"
          },
          {
            "name": "lossUsd",
            "type": "u64"
          },
          {
            "name": "exitFee",
            "type": "u64"
          },
          {
            "name": "exitFeeUsd",
            "type": "u64"
          },
          {
            "name": "borrowFeeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proposeAdminParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAdmin",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "removeCollateralEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "custodyMint",
            "type": "pubkey"
          },
          {
            "name": "custodySeed",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "side",
            "type": "u8"
          },
          {
            "name": "removeAmountUsd",
            "type": "u64"
          },
          {
            "name": "newCollateralAmountUsd",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u32"
          },
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "poolType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "removeCollateralLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralUsd",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "removeCollateralShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralUsd",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "removeCustodyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ratios",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tokenRatios"
                  }
                },
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "removeLiquidStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "removeLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lpAmountIn",
            "type": "u64"
          },
          {
            "name": "minAmountOut",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "removeLockedStakeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "staking",
            "type": "pubkey"
          },
          {
            "name": "lockedStakeId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "removeLockedStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockedStakeIndex",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "reservedSpots",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          }
        ]
      }
    },
    {
      "name": "resolvePositionBorrowFeesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "setAdminParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAdmin",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "setAllPoolsFeeSharesParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lpFeeShareBps",
            "type": "u16"
          },
          {
            "name": "lmFeeShareBps",
            "type": "u16"
          },
          {
            "name": "referrerFeeShareBps",
            "type": "u16"
          },
          {
            "name": "protocolFeeShareBps",
            "type": "u16"
          },
          {
            "name": "managerFeeShareBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "setCustodyAllowSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allowSwap",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "setCustodyAllowTradeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allowTrade",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "setCustodyConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isStable",
            "type": "bool"
          },
          {
            "name": "oracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "tradeOracle",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "pricing",
            "type": {
              "defined": {
                "name": "pricingParams"
              }
            }
          },
          {
            "name": "fees",
            "type": {
              "defined": {
                "name": "fees"
              }
            }
          },
          {
            "name": "borrowRate",
            "type": {
              "defined": {
                "name": "borrowRateParams"
              }
            }
          },
          {
            "name": "virtualFunding",
            "type": {
              "defined": {
                "name": "virtualFundingParams"
              }
            }
          },
          {
            "name": "ratios",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tokenRatios"
                  }
                },
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "setCustodyMaxCumulativeLongPositionSizeUsdParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxCumulativeLongPositionSizeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setCustodyMaxCumulativeShortPositionSizeUsdParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxCumulativeShortPositionSizeUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setCustodyVirtualFundingParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "virtualFunding",
            "type": {
              "defined": {
                "name": "virtualFundingParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "setPoolAllowSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allowSwap",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "setPoolAllowTradeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allowTrade",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "setPoolAumSoftCapUsdParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "aumSoftCapUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setPoolFeeConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "poolType",
            "type": "u8"
          },
          {
            "name": "oracleProvider",
            "type": "u8"
          },
          {
            "name": "lpFeeShareBps",
            "type": "u16"
          },
          {
            "name": "lmFeeShareBps",
            "type": "u16"
          },
          {
            "name": "referrerFeeShareBps",
            "type": "u16"
          },
          {
            "name": "protocolFeeShareBps",
            "type": "u16"
          },
          {
            "name": "managerFeeShareBps",
            "type": "u16"
          },
          {
            "name": "managerFeeRecipient",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "setPoolLiquidityStateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "liquidityState",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "setPoolOracleConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oracleProvider",
            "type": "u8"
          },
          {
            "name": "multiOracleConfig",
            "type": {
              "defined": {
                "name": "multiOracleConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "setPoolPositionExitFeeConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "enabled",
            "type": "bool"
          },
          {
            "name": "minPositionOpenTimeSeconds",
            "type": "u64"
          },
          {
            "name": "minPositionUpdateTimeBeforeCloseSeconds",
            "type": "u64"
          },
          {
            "name": "ageTier1Seconds",
            "type": "u64"
          },
          {
            "name": "ageTier2Seconds",
            "type": "u64"
          },
          {
            "name": "ageTier3Seconds",
            "type": "u64"
          },
          {
            "name": "multiplierTier1Bps",
            "type": "u32"
          },
          {
            "name": "multiplierTier2Bps",
            "type": "u32"
          },
          {
            "name": "multiplierTier3Bps",
            "type": "u32"
          },
          {
            "name": "multiplierAfterTier3Bps",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "setStakingLmEmissionPotentiometersParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lmEmissionPotentiometerBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "setStopLossEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "stopLossLimitPrice",
            "type": "u64"
          },
          {
            "name": "closePositionPrice",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "positionSide",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "setStopLossLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stopLossLimitPrice",
            "type": "u64"
          },
          {
            "name": "closePositionPrice",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "setStopLossShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stopLossLimitPrice",
            "type": "u64"
          },
          {
            "name": "closePositionPrice",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "setTakeProfitEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionId",
            "type": "u64"
          },
          {
            "name": "takeProfitLimitPrice",
            "type": "u64"
          },
          {
            "name": "positionSide",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "setTakeProfitLongParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "takeProfitLimitPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setTakeProfitShortParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "takeProfitLimitPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setVestDelegateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "delegate",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "stableLockedAmountStat",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "custody",
            "type": "pubkey"
          },
          {
            "name": "lockedAmount",
            "type": "u64"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "staking",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakingType",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stakedTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "rewardTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "lmRewardTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "rewardTokenDecimals",
            "type": "u8"
          },
          {
            "name": "stakedTokenDecimals",
            "type": "u8"
          },
          {
            "name": "initialized",
            "type": "u8"
          },
          {
            "name": "nbLockedTokens",
            "type": "u64"
          },
          {
            "name": "nbLiquidTokens",
            "type": "u64"
          },
          {
            "name": "stakedTokenMint",
            "type": "pubkey"
          },
          {
            "name": "resolvedRewardTokenAmount",
            "type": "u64"
          },
          {
            "name": "resolvedStakedTokenAmount",
            "type": "u64"
          },
          {
            "name": "resolvedLmRewardTokenAmount",
            "type": "u64"
          },
          {
            "name": "resolvedLmStakedTokenAmount",
            "type": "u64"
          },
          {
            "name": "currentStakingRound",
            "type": {
              "defined": {
                "name": "stakingRound"
              }
            }
          },
          {
            "name": "currentStakingRoundLiquidRewardsUsd",
            "type": "u64"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "nextStakingRound",
            "type": {
              "defined": {
                "name": "nextStakingRound"
              }
            }
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "resolvedStakingRounds",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "stakingRound"
                  }
                },
                32
              ]
            }
          },
          {
            "name": "registeredResolvedStakingRoundCount",
            "type": "u8"
          },
          {
            "name": "padding3",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "lmEmissionPotentiometerBps",
            "type": "u16"
          },
          {
            "name": "monthsElapsedSinceInception",
            "type": "u16"
          },
          {
            "name": "paddingUnsafe",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "emissionAmountPerRoundLastUpdate",
            "type": "i64"
          },
          {
            "name": "currentMonthEmissionAmountPerRound",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakingRound",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "rate",
            "type": "u64"
          },
          {
            "name": "totalStake",
            "type": "u64"
          },
          {
            "name": "totalClaim",
            "type": "u64"
          },
          {
            "name": "lmRate",
            "type": "u64"
          },
          {
            "name": "lmTotalStake",
            "type": "u64"
          },
          {
            "name": "lmTotalClaim",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "swapAmountAndFees",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "feeIn",
            "type": "u64"
          },
          {
            "name": "feeOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "swapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minAmountOut",
            "type": "u64"
          },
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "switchboardFeedMapEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adrenaFeedId",
            "type": "u8"
          },
          {
            "name": "switchboardFeedHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "switchboardUpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxAgeSlots",
            "type": "u64"
          },
          {
            "name": "feedMap",
            "type": {
              "vec": {
                "defined": {
                  "name": "switchboardFeedMapEntry"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "syntheticCustodyInfoSnapshotPda",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradePrice",
            "type": "u64"
          },
          {
            "name": "shortPnl",
            "type": "i64"
          },
          {
            "name": "longPnl",
            "type": "i64"
          },
          {
            "name": "openInterestLongUsd",
            "type": "u64"
          },
          {
            "name": "openInterestShortUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeProfitUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLossUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeSwapFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidityFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeClosePositionFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeLiquidationFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeBorrowFeeUsd",
            "type": "u64"
          },
          {
            "name": "cumulativeTradingVolumeUsd",
            "type": "u64"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tokenRatios",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "target",
            "type": "u16"
          },
          {
            "name": "min",
            "type": "u16"
          },
          {
            "name": "max",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tradeStats",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profitUsd",
            "type": "u64"
          },
          {
            "name": "lossUsd",
            "type": "u64"
          },
          {
            "name": "oiLongUsd",
            "type": "u64"
          },
          {
            "name": "oiShortUsd",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "u128Split",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "high",
            "type": "u64"
          },
          {
            "name": "low",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateOracleParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          },
          {
            "name": "switchboardOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "switchboardUpdateParams"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "updatePoolAumParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "batchPrices"
                }
              }
            }
          },
          {
            "name": "multiOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "multiBatchPrices"
                }
              }
            }
          },
          {
            "name": "switchboardOraclePrices",
            "type": {
              "option": {
                "defined": {
                  "name": "switchboardUpdateParams"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "upgradeLockedStakeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "staking",
            "type": "pubkey"
          },
          {
            "name": "lockedStakeId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "lockedDays",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "upgradeLockedStakeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockedStakeId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "lockedDays",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "profilePicture",
            "type": "u8"
          },
          {
            "name": "wallpaper",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "u8"
          },
          {
            "name": "team",
            "type": "u8"
          },
          {
            "name": "continent",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": "u8"
          },
          {
            "name": "nickname",
            "type": {
              "defined": {
                "name": "limitedString"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "achievements",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "referrerProfile",
            "type": "pubkey"
          },
          {
            "name": "claimableReferralFeeUsd",
            "type": "u64"
          },
          {
            "name": "totalReferralFeeUsd",
            "type": "u64"
          },
          {
            "name": "rollingTradeWindowStart",
            "type": "i64"
          },
          {
            "name": "tradesInWindow",
            "type": "u16"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userStaking",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "unusedUnsafe",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "stakingType",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "lockedStakeIdCounter",
            "type": "u64"
          },
          {
            "name": "liquidStake",
            "type": {
              "defined": {
                "name": "liquidStake"
              }
            }
          },
          {
            "name": "lockedStakes",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "lockedStake"
                  }
                },
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vest",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "originBucket",
            "type": "u8"
          },
          {
            "name": "cancelled",
            "type": "u8"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "voteMultiplier",
            "type": "u32"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "unlockStartTimestamp",
            "type": "i64"
          },
          {
            "name": "unlockEndTimestamp",
            "type": "i64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "lastClaimTimestamp",
            "type": "i64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "delegate",
            "type": "pubkey"
          },
          {
            "name": "hasDelegate",
            "type": "u8"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "padding3",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vestRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "vests",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "vestingTokenAmount",
            "type": "u64"
          },
          {
            "name": "vestedTokenAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "virtualFundingParams",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxHourlyFundingRate",
            "type": "u64"
          },
          {
            "name": "minTotalOiUsd",
            "type": "u64"
          },
          {
            "name": "imbalanceSensitivityBps",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "virtualFundingState",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentRateLongToShort",
            "type": "i64"
          },
          {
            "name": "lastUpdate",
            "type": "i64"
          },
          {
            "name": "cumulativeLongToShort",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          },
          {
            "name": "cumulativeShortToLong",
            "type": {
              "defined": {
                "name": "u128Split"
              }
            }
          }
        ]
      }
    },
    {
      "name": "volumeStats",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapUsd",
            "type": "u64"
          },
          {
            "name": "addLiquidityUsd",
            "type": "u64"
          },
          {
            "name": "removeLiquidityUsd",
            "type": "u64"
          },
          {
            "name": "openPositionUsd",
            "type": "u64"
          },
          {
            "name": "closePositionUsd",
            "type": "u64"
          },
          {
            "name": "liquidationUsd",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
