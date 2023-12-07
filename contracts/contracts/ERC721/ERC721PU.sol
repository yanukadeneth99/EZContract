// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Base is ERC721, Ownable {
    string inBaseURI;
    uint256 private _nextTokenId;
    uint256 private _nftPrice;

    constructor(
        address initialOwner,
        string memory tokenName,
        string memory tokenSymbol,
        string memory baseURI,
        uint256 nftPrice,
        uint256 preMint
    ) ERC721(tokenName, tokenSymbol) Ownable(initialOwner) {
        inBaseURI = baseURI;
        _nftPrice = nftPrice;

        // Pre-mint NFTs
        for (uint256 i = 0; i < preMint; i++) {
            uint256 tokenId = _nextTokenId++;
            _mint(msg.sender, tokenId);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return inBaseURI;
    }

    function safeMint() public payable {
        require(msg.value >= _nftPrice, "Not enough ETH sent; check price!");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function changeBaseURI(string memory baseURI) public onlyOwner {
        inBaseURI = baseURI;
    }
}
