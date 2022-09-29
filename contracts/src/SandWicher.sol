// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IPancakeRouter02 {
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

contract SandWicher is Ownable, ReentrancyGuard {
    /**
     * @dev Buys tokens
     */
    function buy(bytes calldata _data) public payable onlyOwner nonReentrant {
        (
            address router,
            uint256 amountIn,
            uint256 amountOutMin,
            address[] memory path
        ) = abi.decode(_data, (address, uint256, uint256, address[]));

        IERC20 fromToken = IERC20(path[0]);

        _approve(fromToken, router, amountIn);

        IPancakeRouter02(router)
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                address(this),
                block.timestamp
            );
    }

    /**
     * Sells  tokens
     * Balance of tokens we are selling to be gt > 0
     */
    function sell(bytes calldata _data) public payable onlyOwner nonReentrant {
        (address router, address[] memory path, uint256 amountOutMin) = abi
            .decode(_data, (address, address[], uint256));

        uint256 amountIn = IERC20(path[0]).balanceOf(address(this));

        require(amountIn > 0, "!BAL");

        _approve(IERC20(path[0]), router, amountIn);

        IPancakeRouter02(router)
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                address(this),
                block.timestamp
            );
    }

    function simulate(bytes calldata buy_data, bytes calldata sell_data)
        external
        payable
        onlyOwner
        nonReentrant
    {
        buy(buy_data);
        sell(sell_data);
    }

    function _approve(
        IERC20 token,
        address router,
        uint256 amountIn
    ) internal {
        if (token.allowance(address(this), router) < amountIn) {
            // approving the tokens to be spent by router
            SafeERC20.safeApprove(token, router, amountIn);
        }
    }

    /**
     * allows owner of contract to withdraw tokens
     */

    function withdrawToken(IERC20 _token, uint256 amount) external onlyOwner {
        SafeERC20.safeTransfer(_token, owner(), amount);
    }

    /**
     * Lets the contract receive native tokens
     */
    receive() external payable {}
}
