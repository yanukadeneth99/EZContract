// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Base is ERC721, Ownable {
    string inBaseURI;
    uint256 private _nextTokenId;
    uint256 private _nftPrice;
    uint256 private _maxNFTs;

    constructor(
        address initialOwner,
        string memory tokenName,
        string memory tokenSymbol,
        string memory baseURI,
        uint256 nftPrice,
        uint256 maxNFTs
    ) ERC721(tokenName, tokenSymbol) Ownable(initialOwner) {
        inBaseURI = baseURI;
        _nftPrice = nftPrice;
        _maxNFTs = maxNFTs;
    }

    function _baseURI() internal view override returns (string memory) {
        return inBaseURI;
    }

    function safeMint() public payable {
        require(msg.value >= _nftPrice, "Not enough ETH sent; check price!");
        require(_nextTokenId < _maxNFTs, "Max NFTs minted!");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }
}
