import { constants, utils } from 'ethers';
import { config } from './config';
import { mempoolWrapper } from './core';

const Main = async () => {
  console.info(`Starting...\n- - -`);

  // get args
  let args = process.argv.slice(2);

  args.length === 0 && mempoolWrapper.monitor();

  if (args.length > 0) {
    let action = args[0].toLowerCase();
    let token = args[1];

    if (action === 'sell') {
      let sell = await mempoolWrapper.sell({
        router: config.PANCAKE_ROUTER_ADDRESS,
        amountOutMin: constants.Zero,
        path: [token, config.WBNB_ADDRESS],
      });
      console.log(sell);
    }

    if (action === 'transfer') {
      let transfer = await mempoolWrapper.withdrawToken(token);
      console.log(transfer);
    }

    if (action === 'buy') {
      let buy = await mempoolWrapper.buy({
        router: config.PANCAKE_ROUTER_ADDRESS,
        amountOutMin: constants.Zero,
        path: [
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          config.WBNB_ADDRESS,
        ],
        amountIn: utils.parseUnits('0.05'),
      });
      console.log(buy);
    }
  }
};

Main();
