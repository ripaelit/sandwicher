import 'dotenv/config';

if (!process.env.PRIVATE_KEY) {
  throw new Error(
    'PRIVATE_KEY is not defined and must be set in the .env file'
  );
}

export const config = {
  /**
   * @description PRIVATE_KEY is the private key of the account that will be used to sign transactions
   */
  PRIVATE_KEY: process.env.PRIVATE_KEY!,

  /**
   * @description JSON RPC endpoint
   * @type {string}
   */
  JSON_RPC: process.env.JSON_RPC!,

  /**
   * @description WSS_URL is the websocket endpoint of the WSS  endpoint
   */

  WSS_URL: process.env.WSS_URL!,

  /**
   * @description Contract address
   * @type {string}
   */
  CONTRACT_ADDRESS: '0xA16Dc83299A48aDA8ddf99F9Df36dBDf45ab91fD',

  /**
   * STABLE TOKENS addresses e.g BUSD, USDT, USDC, etc
   */
  STABLE_TOKENS: [''],

  /**
   * @description Explorer URL
   */
  EXPLORER_URL: 'https://bscscan.com',

  /**
   * @description Telegram Bot Token
   */

  BOT_TOKEN: process.env.BOT_TOKEN!,

  /**
   * @description Telegram Chat IDs for users to receive notifications
   * @type {string[]}
   */
  WHITELISTED_USERS: ['251669027'],

  ////////////// FALLBACK VALUES /////////////////

  /**
   * @description DEFAULT_GAS_LIMIT that we use in transactions
   */
  DEFAULT_GAS_LIMIT: 700_000 * 3,

  /**
   * @description MIN_SLIPPAGE_THRESHOLD is the minimum slippage threshold that we allow
   * @type {number}
   * @default 1%
   */
  MIN_SLIPPAGE_THRESHOLD: 0.8,

  /**
   * @description GAS_FACTOR that we use in front-running the target
   */
  GAS_FACTOR: 3.9,

  //////////////// TRADE CONFIG /////////////////

  /**
   * @description WBNB address
   * @type {string}
   * @default 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
   */
  WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',

  /**
   * @description PancakeSwap Router address
   * @type {string}
   * @default 0x10ED43C718714eb63d5aA57B78B54704E256024E
   */
  PANCAKE_ROUTER_ADDRESS: '0x10ED43C718714eb63d5aA57B78B54704E256024E',

  /**
   * @description Trade Config
   * @type MIN_PROFIT_THRESHOLD is the minimum profit threshold that we allow
   * @type {number}
   */
  MIN_PROFIT_THRESHOLD: parseFloat(process.env.MIN_PROFIT_THRESHOLD || '0.003'),
};
