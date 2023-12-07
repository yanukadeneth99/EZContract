export interface ERC20DataINT {
  readonly name: string;
  readonly symbol: string;
  readonly premint: string;
  readonly premintselected: boolean;
  readonly mintable: boolean;
  readonly burnable: boolean;
  readonly pausable: boolean;
}

export interface ERC721DataINT {
  readonly name: string;
  readonly symbol: string;
  readonly premint: string;
  readonly baseuri: string;
  readonly publicPrice: string;
  readonly maxTokens: string;
  readonly whitelist: `0x${string}`[];
  readonly whitelistPrice: string;
  readonly iswhitelistselected: boolean;
  readonly ismaxmintselected: boolean;
  readonly isuriselected: boolean;
  readonly premintselected: boolean;
}
