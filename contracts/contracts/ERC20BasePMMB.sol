// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ERC20Base is ERC20, ERC20Burnable, Ownable {
    constructor(
        address initialOwner,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 preMint
    ) ERC20(tokenName, tokenSymbol) Ownable(initialOwner) {
        _mint(msg.sender, preMint * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
