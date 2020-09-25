import TronWeb = require('tronweb');

export const TelegramToken = process.env.TELEGRAM_TOKEN || '';
export const TronURL = `https://tron.unifiprotocol.com/api/v1/pools/tron`;

export const Tron = new TronWeb({ fullHost: 'https://api.trongrid.io' });

export interface ContractInfo {
    name: string;
    contract: string;
    decimals: number;
}

export const Contracts: Array<ContractInfo> = [
    {
        name: 'UP',
        contract: 'TUxqQp2qXUx7hT2F6Zx4hy85n8o9L9bzM9',
        decimals: 6,
    },
    {
        name: 'SEED',
        contract: 'TMFvnLMR1r1awHVGZsciwP4e3PVD7eiMWe',
        decimals: 6,
    },
    {
        name: 'USDT',
        contract: 'TYmbq6sGxEe2VkhpSpvfiw5f8ir5HxpAun',
        decimals: 6,
    },
    {
        name: 'KLV',
        contract: 'TDPWh9r6pMKN3DJDPJAZH7GMpewmgofyfW',
        decimals: 6,
    },
    {
        name: 'WIN',
        contract: 'TDYEusxwaRkxs6JdGdWFLpEcXtjuVjeykU',
        decimals: 6,
    },
    {
        name: 'BNKR',
        contract: 'TW1cnZrL1qtrH6mXXK2CM75Ax77C8ffmtk',
        decimals: 6,
    },
    {
        name: 'JFI',
        contract: 'TEAVNdAKKEzXUSvECuQHCyXUZJ1aGRKa3s',
        decimals: 6,
    },
    {
        name: 'JST',
        contract: 'TStFJsoAcXXpn9rW7Q9VUhRE1D2pQV5oEN',
        decimals: 6,
    },
    {
        name: 'SUN',
        contract: 'TCFkPBue2PJC4DYm3pcf2n8zS4BoS7HX5t',
        decimals: 6,
    },
    {
        name: 'USDJ',
        contract: 'TAHRToWQxwWiAA8eG96ZXk6AZAFf1fWRhd',
        decimals: 6,
    },
    {
        name: 'DZI',
        contract: 'TGSnBBsXX6Dh5cK4tteDzQCVoCaVBzT1qQ',
        decimals: 6,
    },
    {
        name: 'DICE',
        contract: 'TVJ7r82DcYaX3VBZY7Ri4P3v1gChcXTmJj',
        decimals: 6,
    },
];

export function RetrieveContract(name: string): ContractInfo {
    for (let i = 0; i < Contracts.length; i++) {
        const Contract = Contracts[i];
        if (Contract.name === name) {
            return Contract;
        }
    }
    return null;
}